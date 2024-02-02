import { Module } from '@nestjs/common';
import { HistoricService } from './historic.service';
import { HistoricController } from './historic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Historic } from './entities/historic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Historic])],
  controllers: [HistoricController],
  providers: [HistoricService]
})
export class HistoricModule {}
