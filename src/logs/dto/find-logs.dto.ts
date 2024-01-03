import { Expose } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindLogsDto {
  @ApiProperty({
    example: 0
  })
  @IsNumber()
  @Expose()
  @IsOptional()
  skip?: number;

  @ApiProperty({
    example: 10
  })
  @IsNumber()
  @Expose()
  @IsOptional()
  take?: number;

  @ApiProperty({
    example: 'tickets'
  })
  @IsString()
  @Expose()
  @IsOptional()
  entity?: string;

  @ApiProperty({
    example: 'GET'
  })
  @IsString()
  @Expose()
  @IsOptional()
  method?: string;

  @ApiProperty({
    example: 'blue@gmail.com'
  })
  @IsString()
  @Expose()
  @IsOptional()
  user?: string;

  @ApiProperty({
    example: '200'
  })
  @IsString()
  @Expose()
  @IsOptional()
  responseCode?: string;

  @ApiProperty({
    example: new Date()
  })
  @IsDate()
  @Expose()
  @IsOptional()
  from?: Date;

  @ApiProperty({
    example: new Date()
  })
  @IsDate()
  @Expose()
  @IsOptional()
  to?: Date;
}
