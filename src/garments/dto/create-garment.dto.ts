import { Expose, Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { UpdatePriceDto } from './update-price.dto';

export class CreateGarmentDto {
  @Expose()
  @IsString()
  name: string;

  // @IsArray()
  // @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => UpdatePriceDto)
  // @Expose()
  // prices?: UpdatePriceDto[];
}
