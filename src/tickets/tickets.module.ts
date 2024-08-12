import { Module, forwardRef } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { Priority } from './entities/priority.entity';
import { Type } from './entities/type.entity';
import { Impact } from './entities/impact.entity';
import { Urgency } from './entities/urgency.entity';
import { Ticket } from './entities/ticket.entity';
import { User } from '../users/entities/user.entity';
import { CommentTicket } from './entities/comment-ticket.entity';
import { Historic } from '../historic/entities/historic.entity';
import { FileE } from './entities/files.entity';
import { EmailModule } from '../email/email.module';
import { AtentionTime } from '../atention-time/entities/atention-time.entity';

@Module({
  imports: [
    forwardRef(() => EmailModule),
    TypeOrmModule.forFeature([
      Ticket,
      Status,
      Priority,
      Type,
      Impact,
      Urgency,
      User,
      CommentTicket,
      Historic,
      FileE,
      AtentionTime
    ])
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService]
})
export class TicketsModule {}
