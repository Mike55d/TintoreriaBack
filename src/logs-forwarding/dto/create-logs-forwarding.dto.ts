import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLogsForwardingDto {
  @Expose()
  @IsNumber()
  type: number;

  @Expose()
  @IsString()
  @IsOptional()
  domain?: string;

  @Expose()
  @IsString()
  @IsOptional()
  protocol?: string;

  @Expose()
  @IsString()
  @IsOptional()
  port?: string;

  @Expose()
  @IsNumber()
  @IsOptional()
  severity?: number;

  @Expose()
  @IsNumber()
  @IsOptional()
  facility?: number;

  @Expose()
  @IsString()
  @IsOptional()
  format?: string;

  @Expose()
  @IsString()
  @IsOptional()
  url?: string;

  @Expose()
  @IsString()
  @IsOptional()
  method?: string;

  @Expose()
  @IsString()
  @IsOptional()
  content_type?: string;

  @Expose()
  @IsString()
  @IsOptional()
  body?: string;

  @Expose()
  @IsString()
  @IsOptional()
  fields?: string;

  @Expose()
  @IsString()
  @IsOptional()
  headers?: string;
}
