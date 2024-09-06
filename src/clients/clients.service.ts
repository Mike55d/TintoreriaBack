import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetClientsDto } from './dto/get-clients.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>
  ) {}

  async create(createClientDto: CreateClientDto) {
    try {
      const formatCompanies = createClientDto.companies.map(idCompany => ({ id: idCompany }));
      const client = this.clientsRepository.create({
        ...createClientDto,
        companies: formatCompanies
      });
      return await this.clientsRepository.save(client);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findAll(query: GetClientsDto) {
    const data = await this.clientsRepository.find({
      skip: query.skip,
      take: query.take,
      order: { id: 'DESC' },
      relations: ['companies']
    });
    const count = await this.clientsRepository.count();
    return { data, count };
  }

  async findOne(id: number) {
    return await this.clientsRepository.findOne({ where: { id }, relations: ['companies'] });
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const formatCompanies = updateClientDto.companies.map(company => ({ id: company }));
    try {
      return await this.clientsRepository.save({
        id,
        ...updateClientDto,
        companies: formatCompanies
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async remove(id: number) {
    const client = await this.findOne(id);

    if (client) {
      await this.clientsRepository.remove(client);
    }
  }
}
