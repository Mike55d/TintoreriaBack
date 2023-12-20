import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ArrayNotEmpty, IsEmail, IsNumber, IsOptional, Max, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'dummyEmail@gmail.com'
  })
  @Expose()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false, example: 'dummy name' })
  @Expose()
  @IsOptional()
  @Max(512)
  name?: string;

  @ApiProperty({
    example: [1, 2]
  })
  @Expose()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  roles: number[];

  @ApiProperty({ required: false })
  @Expose()
  @IsString()
  @IsOptional()
  salt?: string;

  @ApiProperty({ required: false })
  @Expose()
  @IsString()
  @IsOptional()
  verifier?: string;
}
