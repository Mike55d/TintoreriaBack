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
  @IsNumber()
  type: number;

  @Expose()
  @IsNumber()
  price: number;
}
