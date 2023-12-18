import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class AuthSupport {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  userApproval: string;
}
