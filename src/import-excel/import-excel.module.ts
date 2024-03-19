import { Module } from '@nestjs/common';
import { ImportExcelService } from './import-excel.service';
import { ImportExcelController } from './import-excel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { AssetTypes } from '../assets/entities/asset.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ApiConfigModule } from '../api-config/api-config.module';
import { ApiConfigService } from '../api-config/api-config.service';
import { Client } from '../clients/entities/clients.entity';
import { AlertTitle } from '../categories/entities/alert-title.entity';
import { AssetFields } from '../assets/entities/asset-fields.entity';
import { GlpiTicket } from '../tickets/entities/glpi_ticket.entity';
import { Ticket } from '../tickets/entities/ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Client,
      Category,
      AssetTypes,
      AlertTitle,
      AssetFields,
      GlpiTicket,
      Ticket
    ]),
    MulterModule.registerAsync({
      imports: [ApiConfigModule],
      useFactory: async (config: ApiConfigService) => config.getMulterOptions(),
      inject: [ApiConfigService]
    })
  ],
  controllers: [ImportExcelController],
  providers: [ImportExcelService]
})
export class ImportExcelModule {}
