import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { Priority } from './entities/priority.entity';
import { Type } from './entities/type.entity';
import { Impact } from './entities/impact.entity';
import { Urgency } from './entities/urgency.entity';
import { Ticket } from './entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Status, Priority, Type, Impact, Urgency])],
  controllers: [TicketsController],
  providers: [TicketsService]
})
export class TicketsModule {}
