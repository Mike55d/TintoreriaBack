import { Injectable } from '@nestjs/common';
import { CreateClientAssetDto } from './dto/create-client-asset.dto';
import { UpdateClientAssetDto } from './dto/update-client-asset.dto';
import { ClientAsset } from './entities/client-asset.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClientAssetService {
  constructor(
    @InjectRepository(ClientAsset)
    private clientAssetRepository: Repository<ClientAsset>
  ) {}

  create(createClientAssetDto: CreateClientAssetDto) {
    const clientAsset = this.clientAssetRepository.create({
      ...createClientAssetDto,
      assetType: {
        id: createClientAssetDto.assetType
      }
    });
    return this.clientAssetRepository.save(clientAsset);
  }

  findAll() {
    return this.clientAssetRepository.find({ relations: ['assetType'] });
  }

  findOne(id: number) {
    return this.clientAssetRepository.find({ where: { id }, relations: ['assetType'] });
  }

  findOneByClient(id: number) {
    return this.clientAssetRepository.find({
      where: { client: { id: id } },
      relations: ['assetType', 'client']
    });
  }

  update(id: number, updateClientAssetDto: UpdateClientAssetDto) {
    return this.clientAssetRepository.update(id, {
      ...updateClientAssetDto,
      assetType: {
        id: updateClientAssetDto.assetType
      }
    });
  }

  async remove(id: number) {
    const clientAsset = await this.clientAssetRepository.findBy({ id });
    return this.clientAssetRepository.remove(clientAsset);
  }
}
