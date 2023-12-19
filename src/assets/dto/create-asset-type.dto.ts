import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateAssetFieldDto } from './create-asset-field.dto';

export class CreateAssetTypeDto {
  @ApiProperty()
  @IsString()
  @Expose()
  name: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAssetFieldDto)
  @Expose()
  assetFields: CreateAssetFieldDto[];
}
