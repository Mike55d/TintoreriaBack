import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './entities/logs.entity';
import { LogsService } from './logs.service';
import { Session } from '../sessions/entities/session.entity';
import { LogsController } from './logs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Log, Session])],
  providers: [LogsService],
  exports: [LogsService],
  controllers: [LogsController],
})
export class LogsModule {}
