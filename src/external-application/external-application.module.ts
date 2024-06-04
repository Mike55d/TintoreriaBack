import { Module } from '@nestjs/common';
import { ExternalApplicationService } from './external-application.service';
import { ExternalApplicationController } from './external-application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalApplication } from './entities/external-application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExternalApplication])],
  controllers: [ExternalApplicationController],
  providers: [ExternalApplicationService]
})
export class ExternalApplicationModule {}
