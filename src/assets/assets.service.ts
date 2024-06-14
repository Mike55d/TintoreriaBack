import { Injectable } from '@nestjs/common';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAssetTypeDto } from './dto/create-asset-type.dto';
import { AssetTypes } from './entities/asset.entity';
import { AssetFields } from './entities/asset-fields.entity';
import { ChangeSectionDto } from './dto/change-section.dto';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(AssetTypes)
    private assetTypesRepository: Repository<AssetTypes>,
    @InjectRepository(AssetFields)
    private assetFieldsRepository: Repository<AssetFields>
  ) {}

  create(createAssetDto: CreateAssetTypeDto) {
    console.log(createAssetDto);
    const assetField = this.assetTypesRepository.create({
      ...createAssetDto,
      assetFields: createAssetDto.assetFields.map(field => ({
        name: field.name,
        optional: field.optional,
        type: field.type,
        section: field.section
      }))
    });
    return this.assetTypesRepository.save(assetField);
  }

  findAll() {
    return this.assetTypesRepository.find({ relations: ['assetFields'] });
  }

  findOne(id: number) {
    return this.assetTypesRepository.find({ where: { id }, relations: ['assetFields'] });
  }

  update(id: number, updateAssetDto: UpdateAssetDto) {
    return this.assetTypesRepository.save({
      id,
      ...updateAssetDto,
      assetFields: updateAssetDto.assetFields.map(field => ({
        name: field.name,
        optional: field.optional,
        type: field.type,
        section: field.section
      }))
    });
  }

  async remove(id: number) {
    const asset = await this.assetTypesRepository.findBy({ id });
    return await this.assetTypesRepository.remove(asset);
  }

  getAssetAndFields(id: number) {
    return this.assetTypesRepository.findOne({ where: { id }, relations: ['assetFields'] });
  }

  changeSectionAssetField(id: number, changeSectionDto: ChangeSectionDto) {
    return this.assetFieldsRepository.update(id, {
      section: changeSectionDto.section
    });
  }
}
