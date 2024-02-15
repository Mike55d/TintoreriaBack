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
    return this.clientsRepository.find({ relations: ['clientAssets', 'clientAssets.assetType'] });
  }

  async findOne(id: number) {
    return this.clientsRepository.findOne({
      where: {
        id
      },
      relations: ['clientAssets', 'clientAssets.assetType']
    });
  }

  async create(client: CreateClientDto) {
    const { clientAssets } = client;
    const clientAssestFormat = clientAssets.map(asset => ({
      ...asset,
      assetType: { id: asset.assetType }
    }));
    const newClient = this.clientsRepository.create({
      ...client,
      emails: client.emails.join(','),
      clientAssets: clientAssestFormat
    });
    return this.clientsRepository.save(newClient);
  }

  update(id: number, data: UpdateClientDto) {
    const { clientAssets } = data;
    const clientAssestFormat = clientAssets.map(asset => ({
      ...asset,
      assetType: { id: asset.assetType }
    }));
    return this.clientsRepository.save({
      id,
      ...data,
      emails: data.emails.join(','),
      clientAssets: clientAssestFormat
    });
  }

  async remove(id: number) {
    const client = await this.findOne(id);

    if (client) {
      await this.clientsRepository.remove(client);
    }
  }
}
