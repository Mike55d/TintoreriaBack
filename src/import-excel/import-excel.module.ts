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
import { Ticket } from '../tickets/entities/ticket.entity';
import { TicketGlpi } from '../tickets/entities/ticket-glpi.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Client,
      Category,
      AssetTypes,
      AlertTitle,
      AssetFields,
      Ticket
    ]),
    TypeOrmModule.forFeature([TicketGlpi], 'glpi'),
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
