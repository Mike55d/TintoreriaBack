import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { CreateAlertTitlesdDto } from './create-alert-titles.dto';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Category 1'
  })
  @IsString()
  @Expose()
  description: string;

  @ApiProperty({
    example: [
      {
        description: 'dummy description'
      },
      {
        description: 'dummy description 2'
      }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAlertTitlesdDto)
  @Expose()
  alertTitles: CreateAlertTitlesdDto[];
}
