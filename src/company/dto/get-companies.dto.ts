import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetCompaniesDto {
  @IsString()
  @IsOptional()
  skip?: number;

  @IsString()
  @IsOptional()
  take?: number;
}
