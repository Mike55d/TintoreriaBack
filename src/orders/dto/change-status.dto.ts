import { Expose, Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class ChangeStatusDto {
  @Expose()
  @IsNumber()
  statusId: number;
}
