import { Injectable } from '@nestjs/common';
import { Client } from './entities/clients.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>
  ) {}

  async findAll() {
    return this.clientsRepository.find();
  }
}
