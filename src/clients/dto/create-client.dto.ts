import { Expose, Type } from 'class-transformer';
import { IsArray, IsEmail, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
export class CreateClientDto {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  lastname: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  address: string;

  @Expose()
  @IsString()
  phone: string;

  @Expose()
  @IsString()
  country: string;

  @Expose()
  @IsString()
  postalCode: string;

  @Expose()
  @IsString()
  rfc: string;

  @Expose()
  @IsNumber()
  @IsOptional()
  companyId?: number;
}
