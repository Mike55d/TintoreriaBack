import { Module } from '@nestjs/common';
import { GeneralPricesService } from './general-prices.service';
import { GeneralPricesController } from './general-prices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from '../prices/entities/price.entity';
import { GeneralPrice } from './entities/general-price.entity';
import { Garment } from '../garments/entities/garment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Price, GeneralPrice, Garment])],
  controllers: [GeneralPricesController],
  providers: [GeneralPricesService]
})
export class GeneralPricesModule {}
