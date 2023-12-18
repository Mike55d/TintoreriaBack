import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ArrayNotEmpty, IsEmail, IsNumber, IsOptional, Max, IsString } from 'class-validator';

export class newPasswordDataDto {
  @ApiProperty()
  @Expose()
  @IsString()
  salt: string;

  @ApiProperty()
  @Expose()
  @IsString()
  verifier: string;
}
