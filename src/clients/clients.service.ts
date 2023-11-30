import { Injectable } from '@nestjs/common';
import { Client } from './entities/clients.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>
  ) {}

  async findAll() {
    return this.clientsRepository.find();
  }

  async findOne(id: number) {
    return this.clientsRepository.findOne({
      where: {
        id
      }
    });
  }

  async create(client: CreateClientDto) {
    const newClient = this.clientsRepository.create(client);
    return this.clientsRepository.save(newClient);
  }

  update(id: number, data: UpdateClientDto) {
    return this.clientsRepository.update(id, {
      ...data
    });
  }

  async remove(id: number) {
    const client = await this.findOne(id);

    if (client) {
      await this.clientsRepository.remove(client);
    }
  }
}
