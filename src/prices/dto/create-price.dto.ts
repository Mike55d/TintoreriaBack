import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreatePriceDto {
  @Expose()
  @IsNumber()
  type: number;

  @Expose()
  @IsNumber()
  price: number;

  @Expose()
  @IsNumber()
  currencyId: number;

  @Expose()
  @IsNumber()
  garmentId: number;
}
