import { Expose } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GeneralPriceDto {
  @Expose()
  @IsNumber()
  @IsOptional()
  id?: number;

  @Expose()
  @IsNumber()
  currencyId: number;

  @Expose()
  @IsNumber()
  generalPrice: number;

  @Expose()
  @IsNumber()
  ironingDiscount: number;
}
