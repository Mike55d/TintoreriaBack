import { Expose } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class CreateSettingDto {
  @IsString()
  @Expose()
  signature?: string;

  @IsString()
  @Expose()
  domain?: string;

  lastEmailDateTime?: Date;
}
