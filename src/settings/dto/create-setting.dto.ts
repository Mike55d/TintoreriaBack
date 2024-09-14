import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSettingDto {
  @Expose()
  @IsNumber()
  ironing_discount: number;

  @Expose()
  @IsNumber()
  general_price: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  currencyId?: number;
}
