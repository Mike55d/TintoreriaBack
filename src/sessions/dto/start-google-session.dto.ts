import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class StartGoogleSessionDto {
  @IsString()
  @Expose()
  deviceId: string;

  @IsString()
  @Expose()
  token: string;

  @IsString()
  @Expose()
  accessToken: string;

  @IsString()
  @IsOptional()
  @Expose()
  fmcToken?: string;
}
