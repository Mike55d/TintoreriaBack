import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { AssetFields } from './entities/asset-fields.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AssetFields])],
  controllers: [AssetsController],
  providers: [AssetsService]
})
export class AssetsModule {}
