import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, IsArray, IsBoolean } from 'class-validator';

export class AllTicketsDto {
  @IsNumber()
  @IsOptional()
  @Expose()
  skip?: number;

  @IsNumber()
  @Max(200)
  @IsOptional()
  @Expose()
  take?: number;

  @IsString()
  @IsOptional()
  @Expose()
  orderBy?: string;

  @IsString()
  @IsOptional()
  @Expose()
  orderDir?: string;

  @IsArray()
  @IsOptional()
  @Expose()
  filters?: string[];

  @IsBoolean()
  @IsOptional()
  @Expose()
  sla?: boolean;
}
