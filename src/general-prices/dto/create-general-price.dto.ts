import { Expose, Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { UpdatePriceDto } from './update-price.dto';
import { GeneralPriceDto } from './general-price.dto';

export class CreateGeneralPriceDto {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GeneralPriceDto)
  @Expose()
  generalPrices?: GeneralPriceDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdatePriceDto)
  @Expose()
  garmentsWithPrice?: UpdatePriceDto[];
}
