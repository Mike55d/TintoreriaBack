import { Expose } from 'class-transformer';
import { ArrayNotEmpty, IsEmail, IsNumber, IsOptional, Max, IsString } from 'class-validator';

export class newPasswordDataDto {

  @Expose()
  @IsString()
  salt: string;

  @Expose()
  @IsString()
  verifier:string;
}
