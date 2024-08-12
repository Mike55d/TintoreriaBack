import { PartialType } from '@nestjs/swagger';
import { CreateAtentionTimeDto } from './create-atention-time.dto';

export class UpdateAtentionTimeDto extends PartialType(CreateAtentionTimeDto) {}
