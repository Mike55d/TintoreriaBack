import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { Client } from '../clients/entities/clients.entity';
import { Repository } from 'typeorm';
import { AssetTypes } from '../assets/entities/asset.entity';
import readXlsxFile from 'read-excel-file/node';
import { AlertTitle } from '../categories/entities/alert-title.entity';
import { AssetFields } from '../assets/entities/asset-fields.entity';
import { GlpiTicket } from '../tickets/entities/glpi_ticket.entity';
import { Ticket } from '../tickets/entities/ticket.entity';
import XlsxTemplate from 'xlsx-template';
import fs from 'fs/promises';
import path from 'path';
import moment from 'moment';
import { homedir } from 'os';
import sanitizeHtml from 'sanitize-html';
import { SANITIZE_CONFIG } from '../email/constants';

const rowJsonClient = {
  ID: {
    prop: 'id',
    type: String
  },
  ['Nombre completo']: {
    prop: 'name',
    type: String
  },
  Dominio: {
    prop: 'domain',
    type: String
  }
};

const rowJsonCategories = {
  Categoría: {
    prop: 'description',
    type: String
  },
  ['Tipo de alerta']: {
    prop: 'alert',
    type: String
  }
};

const rowJsonAssetTypes = {
  ['Tipo de activo']: {
    prop: 'name',
    type: String
  },
  Campo: {
    prop: 'field',
    type: String
  },
  Tipo: {
    prop: 'type',
    type: String
  }
};

const fieldsExcel = [
  {
    fieldExcel: 'texto',
    fieldType: 'string'
  },
  {
    fieldExcel: 'numerico',
    fieldType: 'number'
  },
  {
    fieldExcel: 'ip',
    fieldType: 'ip'
  },
  {
    fieldExcel: 'email',
    fieldType: 'email'
  }
];

@Injectable()
export class ImportExcelService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(AlertTitle)
    private alertTitleRepository: Repository<AlertTitle>,
    @InjectRepository(AssetTypes)
    private assetTypesRepository: Repository<AssetTypes>,
    @InjectRepository(AssetFields)
    private assetFieldsRepository: Repository<AssetFields>,
    @InjectRepository(GlpiTicket)
    private glpiTicketRepository: Repository<GlpiTicket>,
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>
  ) {}

  async importProducts(file: Express.Multer.File) {
    try {
      const { rows: rowsClient } = await readXlsxFile(file.path, {
        schema: rowJsonClient,
        sheet: 1
      });

      const { rows: rowsCategories } = await readXlsxFile(file.path, {
        schema: rowJsonCategories,
        sheet: 2
      });

      const { rows: rowsAssetTypes } = await readXlsxFile(file.path, {
        schema: rowJsonAssetTypes,
        sheet: 3
      });

      for (let row of rowsClient) {
        const exist = await this.clientsRepository.findOneBy({ name: row['name'] });
        if (!exist) {
          const client = this.clientsRepository.create({
            name: row['name'],
            domain: row['domain'],
            glpiId: row['id']
          });
          await this.clientsRepository.save(client);
        }
      }

      for (let row of rowsCategories) {
        let category = await this.categoriesRepository.findOneBy({
          description: row['description']
        });
        if (!category) {
          const newCategory = this.categoriesRepository.create({
            description: row['description']
          });
          category = await this.categoriesRepository.save(newCategory);
        }
        const alert = await this.alertTitleRepository.findOneBy({
          category: {
            id: category.id
          },
          description: row['alert']
        });
        if (!alert) {
          const newAlert = this.alertTitleRepository.create({
            description: row['alert'],
            category: { id: category.id }
          });
          await this.alertTitleRepository.save(newAlert);
        }
      }

      for (let row of rowsAssetTypes) {
        let assetType = await this.assetTypesRepository.findOneBy({
          name: row['name']
        });
        if (!assetType) {
          const newAssetType = this.assetTypesRepository.create({
            name: row['name']
          });
          assetType = await this.assetTypesRepository.save(newAssetType);
        }
        const field = await this.assetFieldsRepository.findOneBy({
          AssetType: {
            id: assetType.id
          },
          name: row['field']
        });
        if (!field) {
          const newField = this.assetFieldsRepository.create({
            name: row['field'],
            AssetType: { id: assetType.id },
            type: fieldsExcel.find(item => item.fieldExcel == row['type']).fieldType
          });
          await this.assetFieldsRepository.save(newField);
        }
      }

      return [rowsClient, rowsCategories, rowsAssetTypes];
    } catch (error) {
      console.log(error);
    }
  }

  convertPriorities(id: number) {
    switch (id) {
      case 1:
        return 4;
      case 2:
        return 3;
      case 3:
        return 2;
      case 4:
        return 1;
      default:
        return 1;
    }
  }

  async generateFileName(templateName, fileTypeName, values, hideClients?) {
    let templateRoute = 'templates';
    const fileName = `${moment(new Date()).format('YYYY-MM-DD-hh-mm-ss')}-${fileTypeName}`;
    const file = await fs.readFile(path.join('./', templateRoute, templateName));
    const template = new XlsxTemplate(file);
    template.substitute(1, values);
    const dataFile = template.generate();
    await fs.writeFile(
      path.join(homedir(), process.env.REPORTS_PATH, fileName),
      dataFile,
      'binary'
    );
    return fileName;
  }

  async importTicketsGlpi() {
    try {
      const glpi_tickets = await this.glpiTicketRepository.find({});
      const defaultClient = await this.clientsRepository.findOneBy({ glpiId: 62 });
      for (let glpi_ticket of glpi_tickets) {
        const client = await this.clientsRepository.findOneBy({ glpiId: glpi_ticket.userGlpiId });
        const ticket = this.ticketRepository.create({
          id: glpi_ticket.id,
          client: client ?? defaultClient,
          title: glpi_ticket.title,
          openingDate: glpi_ticket.dateCreation,
          description: glpi_ticket.description,
          eventDate: glpi_ticket.date,
          assignDate: glpi_ticket.solvedate,
          status: { id: 1 },
          priority: { id: this.convertPriorities(glpi_ticket.priority) },
          urgency: { id: this.convertPriorities(glpi_ticket.urgency) },
          impact: { id: this.convertPriorities(glpi_ticket.impact) },
          type: { id: glpi_ticket.type }
        });
        await this.ticketRepository.save(ticket);
      }
      return `Tickets imported`;
    } catch (error) {
      console.log(error);
    }
  }

  async ticketsToExcel() {
    const glpi_tickets = await this.glpiTicketRepository.find({ skip: 20000, take: 2000 });
    const newTickets = glpi_tickets.map(glpiTicket => ({
      description: sanitizeHtml(glpiTicket.description, SANITIZE_CONFIG) ?? ''
    }));
    return await this.generateFileName('template1.xlsx', 'tickets-upload.xlsx', {
      tickets: newTickets
    });
  }

  findAll() {
    return `This action returns all importExcel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} importExcel`;
  }

  remove(id: number) {
    return `This action removes a #${id} importExcel`;
  }
}
