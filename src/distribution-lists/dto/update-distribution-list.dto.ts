import { PartialType } from '@nestjs/swagger';
import { CreateDistributionListDto } from './create-distribution-list.dto';

export class UpdateDistributionListDto extends PartialType(CreateDistributionListDto) {}
