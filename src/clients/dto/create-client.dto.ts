import { Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString, MaxLength, ValidateIf } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @MaxLength(32)
  @Expose()
  dni: string;

  @IsNumber()
  @Expose()
  status: number;

  @IsString()
  @MaxLength(128)
  @Expose()
  name: string;

  @IsString()
  @MaxLength(128)
  @Expose()
  trademark: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(128)
  @Expose()
  country: string;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(256)
  @Expose()
  address: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(64)
  @Expose()
  phone: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(128)
  @Expose()
  email: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(128)
  @Expose()
  contactName: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(128)
  @Expose()
  contactPhone: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(2048)
  @Expose()
  notes: string | null;

  @IsEmail()
  @IsOptional()
  @Expose()
  sender_email?: string;
}
