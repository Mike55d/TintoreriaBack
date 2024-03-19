import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested
} from 'class-validator';
import { CreateClientAssetDto } from '../../client-asset/dto/create-client-asset.dto';

export class UpdateClientDto {
  @IsNumber()
  @Expose()
  status: number;

  @IsOptional()
  @IsString()
  @MaxLength(32)
  @Expose()
  dni: string;

  @IsString()
  @MaxLength(128)
  @Expose()
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  @Expose()
  trademark: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  @Expose()
  country: string;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  @Expose()
  address: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  @Expose()
  phone: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  @Expose()
  email: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  @Expose()
  contactName: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  @Expose()
  contactPhone: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(2048)
  @Expose()
  notes: string | null;

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

  @IsOptional()
  @IsString()
  @MaxLength(2048)
  @Expose()
  domain: string | null;

  @IsArray()
  @IsOptional()
  @Expose()
  emails?: string[];
}
