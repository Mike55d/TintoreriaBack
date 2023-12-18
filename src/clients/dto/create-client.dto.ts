import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString, MaxLength, ValidateIf } from 'class-validator';

export class CreateClientDto {
  @ApiProperty()
  @IsString()
  @MaxLength(32)
  @Expose()
  dni: string;

  @ApiProperty()
  @IsNumber()
  @Expose()
  status: number;

  @ApiProperty()
  @IsString()
  @MaxLength(128)
  @Expose()
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(128)
  @Expose()
  trademark: string | null;

  @ApiProperty()
  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(128)
  @Expose()
  country: string;

  @ApiProperty()
  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(256)
  @Expose()
  address: string | null;

  @ApiProperty()
  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(64)
  @Expose()
  phone: string | null;

  @ApiProperty()
  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(128)
  @Expose()
  email: string | null;

  @ApiProperty()
  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(128)
  @Expose()
  contactName: string | null;

  @ApiProperty()
  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(128)
  @Expose()
  contactPhone: string | null;

  @ApiProperty()
  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(2048)
  @Expose()
  notes: string | null;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  @Expose()
  sender_email?: string;
}
