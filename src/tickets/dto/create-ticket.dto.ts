import { Expose, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsEmail,
  IsNumber,
  IsOptional,
  Max,
  IsString,
  IsArray,
  IsObject,
  ValidateNested
} from 'class-validator';
import { AssignUser } from '../tickets.types';
import { AssignUserDto } from './assign-user.dto';

export class CreateTicketDto {
  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AssignUserDto)
  @Expose()
  requesting_users?: AssignUserDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AssignUserDto)
  @Expose()
  observer_users?: AssignUserDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AssignUserDto)
  @Expose()
  assigned_users?: AssignUserDto[];

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
