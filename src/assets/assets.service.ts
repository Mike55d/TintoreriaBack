import { Injectable } from '@nestjs/common';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAssetTypeDto } from './dto/create-asset-type.dto';
import { AssetTypes } from './entities/asset.entity';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(AssetTypes)
    private assetTypesRepository: Repository<AssetTypes>
  ) {}

  create(createAssetDto: CreateAssetTypeDto) {
    const assetField = this.assetTypesRepository.create(createAssetDto);
    return this.assetTypesRepository.save(assetField);
  }

  findAll() {
    return this.assetTypesRepository.find({ relations: ['assetFields'] });
  }

  findOne(id: number) {
    return this.assetTypesRepository.findBy({ id });
  }

  update(id: number, updateAssetDto: UpdateAssetDto) {
    return this.assetTypesRepository.save({
      id,
      ...updateAssetDto
    });
  }

  async remove(id: number) {
    const asset = await this.assetTypesRepository.findBy({ id });
    return this.assetTypesRepository.remove(asset);
  }
}
