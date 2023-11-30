import { Expose } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsEmail,
  IsNumber,
  IsOptional,
  Max,
  IsString,
  IsArray
} from 'class-validator';

export class CreateTicketDto {
  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsOptional()
  description?: string;

  @Expose()
  @IsArray()
  @IsOptional()
  requesting_users?: number[];

  @Expose()
  @IsArray()
  @IsOptional()
  observer_users?: number[];

  @Expose()
  @IsArray()
  @IsOptional()
  assigned_users?: number[];

  @Expose()
  @IsNumber()
  priority: number;

  @Expose()
  @IsNumber()
  type: number;

  @Expose()
  @IsNumber()
  impact: number;

  @Expose()
  @IsNumber()
  urgency: number;

  @Expose()
  @IsNumber()
  status: number;

  @Expose()
  @IsString()
  @IsOptional()
  comments?: string;
}
