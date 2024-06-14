import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class ChangeSectionDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @Expose()
  section: string;
}
