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
  ValidateNested,
  IsDate
} from 'class-validator';
import { AssignUser } from '../tickets.types';
import { AssignUserDto } from './assign-user.dto';
import { CommentDto } from './comment.dto';

export class CreateTicketDto {
  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsOptional()
  description?: string;

  @Expose()
  @IsDate()
  @IsOptional()
  openingDate?: Date;

  @Expose()
  @IsDate()
  @IsOptional()
  eventDate?: Date;

  @Expose()
  @IsDate()
  @IsOptional()
  assignDate?: Date;

  @Expose()
  @IsString()
  @IsOptional()
  eventDescription?: string;

  @Expose()
  @IsString()
  @IsOptional()
  possibleImpact?: string;

  @Expose()
  @IsString()
  @IsOptional()
  recommendation?: string;

  @Expose()
  @IsString()
  @IsOptional()
  indicesIC?: string;

  @Expose()
  @IsNumber()
  client?: number;

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

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  @Expose()
  comments?: CommentDto[];
}
