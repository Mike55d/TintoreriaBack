import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { Repository } from 'typeorm';
import { AssetFields } from './entities/asset-fields.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(AssetFields)
    private assetFieldsRepository: Repository<AssetFields>
  ) {}

  create(createAssetDto: CreateAssetDto) {
    const assetField = this.assetFieldsRepository.create({
      ...createAssetDto,
      AssetType: {
        id: createAssetDto.assetType
      }
    });
    return this.assetFieldsRepository.save(assetField);
  }

  findAll() {
    return this.assetFieldsRepository.find({});
  }

  findOne(id: number) {
    return this.assetFieldsRepository.findBy({ id });
  }

  update(id: number, updateAssetDto: UpdateAssetDto) {
    return this.assetFieldsRepository.update(id, {
      ...updateAssetDto,
      AssetType: {
        id: updateAssetDto.assetType
      }
    });
  }

  async remove(id: number) {
    const asset = await this.assetFieldsRepository.findBy({ id });
    return this.assetFieldsRepository.remove(asset);
  }
}
