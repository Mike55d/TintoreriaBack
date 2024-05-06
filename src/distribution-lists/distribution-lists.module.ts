import { Module } from '@nestjs/common';
import { DistributionListsService } from './distribution-lists.service';
import { DistributionListsController } from './distribution-lists.controller';
import { DistributionList } from './entities/distributionList.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ DistributionList])],
  controllers: [DistributionListsController],
  providers: [DistributionListsService]
})
export class DistributionListsModule {}
