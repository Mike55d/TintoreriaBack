import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateAssetFieldDto } from './create-asset-field.dto';

export class CreateAssetTypeDto {
  @ApiProperty({
    example: 'Antivirus'
  })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({
    example: [
      {
        name: 'dummy name',
        type: 'text'
      },
      {
        name: 'dummy name 2',
        type: 'number'
      }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAssetFieldDto)
  @Expose()
  assetFields: CreateAssetFieldDto[];
}
