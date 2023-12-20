import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString, MaxLength, ValidateIf } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    example: '123456789'
  })
  @IsString()
  @MaxLength(32)
  @Expose()
  dni: string;

  @ApiProperty({
    example: 1
  })
  @IsNumber()
  @Expose()
  status: number;

  @ApiProperty({
    example: 'Dummy name'
  })
  @IsString()
  @MaxLength(128)
  @Expose()
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(128)
  @Expose()
  trademark: string | null;

  @ApiProperty({
    example: 'Venezuela'
  })
  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(128)
  @Expose()
  country: string;

  @ApiProperty({
    example: 'Dummy address'
  })
  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(256)
  @Expose()
  address: string | null;

  @ApiProperty({
    example: '+58415265854'
  })
  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(64)
  @Expose()
  phone: string | null;

  @ApiProperty({
    example: 'dummyEmail@gmail.com'
  })
  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(128)
  @Expose()
  email: string | null;

  @ApiProperty({
    example: 'Dummy name'
  })
  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(128)
  @Expose()
  contactName: string | null;

  @ApiProperty({
    example: '+58415265854'
  })
  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(128)
  @Expose()
  contactPhone: string | null;

  @ApiProperty({
    example: 'dummy notes'
  })
  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(2048)
  @Expose()
  notes: string | null;

  @ApiProperty({
    example: 'dummyEmail@gmail.com'
  })
  @IsEmail()
  @IsOptional()
  @Expose()
  sender_email?: string;
}
