import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAssetFieldDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Expose()
  id?: number;

  @ApiProperty()
  @IsString()
  @Expose()
  name: string;

  @ApiProperty()
  @IsString()
  @Expose()
  type: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  @Expose()
  optional?: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Expose()
  section: string;
}
