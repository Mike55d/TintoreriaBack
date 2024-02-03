import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class UpdateUserSettingsDto {
  @IsString()
  @Expose()
  columns: string;

  @IsNumber()
  @Expose()
  take: number;
}
