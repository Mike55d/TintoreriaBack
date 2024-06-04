import { PartialType } from '@nestjs/swagger';
import { CreateExternalApplicationDto } from './create-external-application.dto';

export class UpdateExternalApplicationDto extends PartialType(CreateExternalApplicationDto) {}
