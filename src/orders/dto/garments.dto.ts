import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class GarmentsDto {
  @Expose()
  @IsOptional()
  id?: number;

  @Expose()
  @IsNumber()
  quantity: number;

  @Expose()
  @IsBoolean()
  ironingOnly: boolean;

  @Expose()
  @IsNumber()
  garmentId: number;

  @Expose()
  @IsNumber()
  price: number;

  @Expose()
  @IsNumber()
  total: number;
}
