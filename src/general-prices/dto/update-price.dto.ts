import { Expose } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdatePriceDto {
  @Expose()
  @IsNumber()
  @IsOptional()
  id?: number;

  @Expose()
  @IsNumber()
  garmentId: number;

  @Expose()
  @IsOptional()
  type?: number | null;

  @Expose()
  @IsOptional()
  @IsNumber()
  price: number;

  @Expose()
  @IsNumber()
  currencyId: number;
}
