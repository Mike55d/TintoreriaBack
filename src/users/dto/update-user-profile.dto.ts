import { Expose } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserProfileDto {
  @IsBoolean()
  @IsOptional()
  @Expose()
  skipUntrustedRedirect?: boolean;

  @IsBoolean()
  @IsOptional()
  @Expose()
  darkMode?: boolean;

  @IsString({ each: true })
  @IsOptional()
  @Expose()
  trustedDomains?: string[];
}
