import { Module } from '@nestjs/common';
import { LogsForwardingService } from './logs-forwarding.service';
import { LogsForwardingController } from './logs-forwarding.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsForwarding } from './entities/logs-forwarding.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LogsForwarding])],
  controllers: [LogsForwardingController],
  providers: [LogsForwardingService],
  exports: [LogsForwardingService],
})
export class LogsForwardingModule {}
