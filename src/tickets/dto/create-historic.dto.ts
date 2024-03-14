import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHistoricDto {
  @Expose()
  @IsNumber()
  ticket: number;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsNumber()
  @IsOptional()
  user?: number;

  @Expose()
  @IsString()
  @IsOptional()
  email?: string;

  @Expose()
  @IsString()
  content: string;
}
