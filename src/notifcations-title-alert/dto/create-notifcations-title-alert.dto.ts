import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray, IsNumber } from 'class-validator';

export class CreateNotifcationsTitleAlertDto {
  @ApiProperty()
  @IsNumber()
  @Expose()
  alertTitle: number;

  @ApiProperty()
  @IsArray()
  @Expose()
  emails: string[];
}
