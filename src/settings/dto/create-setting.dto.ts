import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateSettingDto {
  @Expose()
  @IsNumber()
  ironing_discount: number;

  @Expose()
  @IsNumber()
  general_price: number;

  @Expose()
  @IsNumber()
  currencyId: number;
}
