import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AssignUserDto {
  @Expose()
  @IsNumber()
  @IsOptional()
  user?: number;

  @Expose()
  @IsString()
  @IsOptional()
  email?: string;
}
