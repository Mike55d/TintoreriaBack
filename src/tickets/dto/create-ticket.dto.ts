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
import { AssignUserDto } from './assign-user.dto';
import { CommentDto } from './comment.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Priority } from '../entities/priority.entity';

export class CreateTicketDto {
  @ApiProperty({
    example: 'Dummy title',
    minLength: 4
  })
  @Expose()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Dummy description',
    minLength: 4
  })
  @Expose()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @Expose()
  @IsDate()
  @IsOptional()
  eventDate?: Date;

  @ApiProperty({
    example: new Date(),
    type: Date
  })
  @Expose()
  @IsDate()
  @IsOptional()
  assignDate?: Date;

  @ApiProperty({
    example: 'Dummy description event',
    minLength: 4
  })
  @Expose()
  @IsString()
  @IsOptional()
  eventDescription?: string;

  @ApiProperty({
    example: 'possible impact'
  })
  @Expose()
  @IsString()
  @IsOptional()
  possibleImpact?: string;

  @ApiProperty({
    example: 'possible recommendation'
  })
  @Expose()
  @IsString()
  @IsOptional()
  recommendation?: string;

  @ApiProperty({
    example: 'dummy indicesIC'
  })
  @Expose()
  @IsString()
  @IsOptional()
  indicesIC?: string;

  @ApiProperty({
    example: 1,
    type: Number
  })
  @Expose()
  @IsNumber()
  client: number;

  @ApiProperty({
    example: [
      {
        user: 1,
        email: 'dummyEmail@gmail.com'
      }
    ]
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AssignUserDto)
  @Expose()
  requesting_users?: AssignUserDto[];

  @ApiProperty({
    example: [
      {
        user: 1,
        email: 'dummyEmail@gmail.com'
      }
    ]
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AssignUserDto)
  @Expose()
  observer_users?: AssignUserDto[];

  @ApiProperty({
    example: [
      {
        user: 1,
        email: 'dummyEmail@gmail.com'
      }
    ]
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AssignUserDto)
  @Expose()
  assigned_users?: AssignUserDto[];

  @ApiProperty({
    example: 1,
    minimum: 1,
    maximum: 4
  })
  @Expose()
  @IsNumber()
  priority: number;

  @ApiProperty({
    example: 1,
    minimum: 1,
    maximum: 2
  })
  @Expose()
  @IsNumber()
  type: number;

  @ApiProperty({
    example: 1,
    minimum: 1,
    maximum: 4
  })
  @Expose()
  @IsNumber()
  impact: number;

  @ApiProperty({
    example: 1,
    minimum: 1,
    maximum: 4
  })
  @Expose()
  @IsNumber()
  urgency: number;

  @ApiProperty({
    example: 1,
    minimum: 1,
    maximum: 2
  })
  @Expose()
  @IsNumber()
  status: number;

  @ApiProperty({
    example: [
      {
        comment: 'dummy comment'
      }
    ]
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  @Expose()
  comments?: CommentDto[];

  @ApiProperty({
    example: 1
  })
  @Expose()
  @IsNumber()
  @IsOptional()
  asset?: number;

  @ApiProperty({
    example: 1
  })
  @Expose()
  @IsNumber()
  @IsOptional()
  category?: number;

  @ApiProperty({
    example: 1
  })
  @Expose()
  @IsNumber()
  @IsOptional()
  alertTitle?: number;
  
  @IsOptional()
  conversationId?: string;
}
