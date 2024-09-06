import { Expose, Type } from 'class-transformer';
import { IsArray, IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Company } from '../../company/entities/company.entity';

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

  @IsArray()
  @IsOptional()
  @Expose()
  companies?: number[];
}
