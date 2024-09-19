import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSettingDto {
  @Expose()
  @IsOptional()
  @IsNumber()
  ironing_discount?: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  general_price?: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  currencyId?: number;
}
