import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { Client } from '../clients/entities/clients.entity';
import { Repository } from 'typeorm';
import { AssetTypes } from '../assets/entities/asset.entity';
import readXlsxFile from 'read-excel-file/node';
import { AlertTitle } from '../categories/entities/alert-title.entity';
import { AssetFields } from '../assets/entities/asset-fields.entity';

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
    private assetFieldsRepository: Repository<AssetFields>
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
