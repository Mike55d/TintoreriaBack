import { Expose } from 'class-transformer';
import { ArrayNotEmpty, IsEmail, IsNumber, IsOptional, IsString, Max } from 'class-validator';

export class UpdateUserDto {
  @Expose()
  @IsEmail()
  @IsOptional()
  email?: string;

  @Expose()
  @IsOptional()
  @Max(512)
  name?: string;

  @Expose()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  roles?: number[];

  @Expose()
  @IsNumber()
  @IsOptional()
  status?: number;

  @Expose()
  @IsString()
  @IsOptional()
  salt?: string;

  @Expose()
  @IsString()
  @IsOptional()
  verifier?: string;
  
}
