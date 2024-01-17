import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsString,
  MaxLength,
  ValidateIf,
  ValidateNested
} from 'class-validator';
import { CreateClientAssetDto } from '../../client-asset/dto/create-client-asset.dto';

export class UpdateClientDto {
  @IsNumber()
  @Expose()
  status: number;

  @IsString()
  @MaxLength(32)
  @Expose()
  dni: string;

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
}
