import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlertTitlesdDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Expose()
  id?: number;

  @ApiProperty()
  @IsString()
  @Expose()
  description: string;
}
