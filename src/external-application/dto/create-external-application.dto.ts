import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CreateExternalApplicationDto {
  @IsString()
  @IsOptional()
  @Expose()
  name: string;

  @IsString()
  @IsOptional()
  @Expose()
  description: string;
}
