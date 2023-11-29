import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class StartMicrosoftSessionDto {
  @IsString()
  @Expose()
  accessToken: string;
}
