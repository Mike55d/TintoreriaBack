import { Expose } from 'class-transformer';
import { ArrayNotEmpty, IsEmail, IsNumber, IsOptional, Max, IsString } from 'class-validator';

export class CreateUserDto {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsOptional()
  @Max(512)
  name?: string;

  @Expose()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  roles: number[];

  @Expose()
  @IsString()
  @IsOptional()
  salt?: string;

  @Expose()
  @IsString()
  @IsOptional()
  verifier?: string;

  @Expose()
  @IsNumber()
  @IsOptional()
  orgId?: number;
}
