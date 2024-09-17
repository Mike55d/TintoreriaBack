import { PartialType } from '@nestjs/swagger';
import { CreateGeneralPriceDto } from './create-general-price.dto';

export class UpdateGeneralPriceDto extends PartialType(CreateGeneralPriceDto) {}
