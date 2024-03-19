import { Module } from '@nestjs/common';
import { HistoricService } from './historic.service';
import { HistoricController } from './historic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Historic } from './entities/historic.entity';
import { EmailModule } from '../email/email.module';
import { TicketsModule } from '../tickets/tickets.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Historic]), EmailModule, TicketsModule, UsersModule],
  controllers: [HistoricController],
  providers: [HistoricService]
})
export class HistoricModule {}
