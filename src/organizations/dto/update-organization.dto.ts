import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateOrganizationDto {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  @IsOptional()
  colorTopbar?: string;

  @IsNumber()
  @IsOptional()
  @Expose()
  admin?: number;

  @IsString()
  @IsOptional()
  @Expose()
  domain?: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  operationLevel: number;

  @IsString()
  @IsOptional()
  @Expose()
  email?: string;

  @IsString()
  @IsOptional()
  @Expose()
  username?: string;

  @Expose()
  @IsString()
  @IsOptional()
  salt?: string;

  @Expose()
  @IsString()
  @IsOptional()
  verifier?: string;

  @IsString()
  @IsOptional()
  @Expose()
  client?: string;

  @Expose()
  @IsString()
  @IsOptional()
  clientSecret?: string;

  @Expose()
  @IsNumber()
  @IsOptional()
  type?: number;
}
