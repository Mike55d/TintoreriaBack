import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserSettingsDto {
  @IsOptional()
  @IsString()
  @Expose()
  columns?: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  take?: number;
}
