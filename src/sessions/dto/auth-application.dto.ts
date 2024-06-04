import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class AuthApplication {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  appId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  appSecret: string;
}
