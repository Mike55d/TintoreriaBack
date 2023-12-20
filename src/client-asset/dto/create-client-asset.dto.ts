import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateClientAssetDto {
  @ApiProperty({
    example: 1
  })
  @IsNumber()
  @Expose()
  assetType: number;

  @ApiProperty({
    example: 'Dummy name'
  })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({ required: false, example: '192.168.1.1' })
  @IsString()
  @IsOptional()
  @Expose()
  ip?: string;
}
