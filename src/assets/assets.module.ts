import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { AssetFields } from './entities/asset-fields.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetTypes } from './entities/asset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssetFields,AssetTypes])],
  controllers: [AssetsController],
  providers: [AssetsService]
})
export class AssetsModule {}
