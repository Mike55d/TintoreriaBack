import { Module } from '@nestjs/common';
import { ClientAssetService } from './client-asset.service';
import { ClientAssetController } from './client-asset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientAsset } from './entities/client-asset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientAsset])],
  controllers: [ClientAssetController],
  providers: [ClientAssetService]
})
export class ClientAssetModule {}
