import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, IsArray } from 'class-validator';

export class SetTicketsFilterDto {
  @IsString()
  @IsOptional()
  @Expose()
  filters?: string;
}
