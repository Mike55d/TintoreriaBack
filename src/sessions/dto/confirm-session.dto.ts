import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ConfirmSessionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  clientSessionProof: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  presessionId: number;
}
