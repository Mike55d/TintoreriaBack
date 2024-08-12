import { Module } from '@nestjs/common';
import { AtentionTimeService } from './atention-time.service';
import { AtentionTimeController } from './atention-time.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtentionTime } from './entities/atention-time.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AtentionTime])],
  controllers: [AtentionTimeController],
  providers: [AtentionTimeService]
})
export class AtentionTimeModule {}
