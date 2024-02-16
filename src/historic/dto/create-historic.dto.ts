import { Expose } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

export class CreateHistoricDto {
  @Expose()
  @IsString()
  message: string;

  @Expose()
  @IsBoolean()
  includeIcs: boolean;
}
