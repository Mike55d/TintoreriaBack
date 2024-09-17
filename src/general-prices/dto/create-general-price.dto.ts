import { Expose, Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { UpdatePriceDto } from './update-price.dto';

export class CreateGeneralPriceDto {
  @Expose()
  @IsNumber()
  currencyId: number;

  @Expose()
  @IsNumber()
  generalPrice: number;

  @Expose()
  @IsNumber()
  ironingDiscount: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdatePriceDto)
  @Expose()
  prices?: UpdatePriceDto[];
}
