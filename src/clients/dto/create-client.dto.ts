import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateIf,
  ValidateNested
} from 'class-validator';
import { CreateClientAssetDto } from '../../client-asset/dto/create-client-asset.dto';

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

  @ApiProperty({
    example: [
      {
        assetType: '3',
        id: 1,
        ip: '192.0.0.1',
        name: 'test',
        type: 'text'
      },
      {
        assetType: '2',
        id: 1,
        ip: '192.0.0.1',
        name: 'test',
        type: 'text'
      }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateClientAssetDto)
  @Expose()
  clientAssets: CreateClientAssetDto[];

  @IsArray()
  @IsOptional()
  @Expose()
  emails?: string[];
}
