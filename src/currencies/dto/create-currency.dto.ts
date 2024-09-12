import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateCurrencyDto {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  code: string;

  @Expose()
  @IsString()
  sign: string;
}
