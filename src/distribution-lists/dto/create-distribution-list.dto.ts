import { Expose } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDistributionListDto {
  @IsString()
  @Expose()
  name: string;

  @IsNumber()
  @Expose()
  client: number;

  @IsArray()
  @IsOptional()
  @Expose()
  emails?: string[];

  @IsString()
  @Expose()
  alertTitle: string;
}
