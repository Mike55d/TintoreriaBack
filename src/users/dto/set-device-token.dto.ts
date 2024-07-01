import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, IsArray } from 'class-validator';

export class SetDeviceTokenDto {
  @IsString()
  @IsOptional()
  @Expose()
  token: string;
}
