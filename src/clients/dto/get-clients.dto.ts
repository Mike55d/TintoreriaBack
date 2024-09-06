import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetClientsDto {
  @IsString()
  @IsOptional()
  skip?: number;

  @IsString()
  @IsOptional()
  take?: number;
}
