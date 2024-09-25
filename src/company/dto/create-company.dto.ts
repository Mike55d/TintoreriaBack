import { Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateCompanyDto {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  brand: string;

  @Expose()
  @IsString()
  address: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  personName: string;

  @Expose()
  @IsEmail()
  personEmail: string;

  @Expose()
  @IsString()
  country: string;

  @Expose()
  @IsNumber()
  currencyId: number;
}
