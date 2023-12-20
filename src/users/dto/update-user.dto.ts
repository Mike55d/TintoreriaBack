import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ArrayNotEmpty, IsEmail, IsNumber, IsOptional, IsString, Max } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'dummyEmail@gmail.com'
  })
  @Expose()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'dummy name'
  })
  @Expose()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: [1, 2]
  })
  @Expose()
  @IsOptional()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  roles?: number[];

  @ApiProperty({
    example: 1
  })
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
