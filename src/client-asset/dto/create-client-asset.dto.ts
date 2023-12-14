import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateClientAssetDto {
  
  @IsNumber()
  @Expose()
  assetType: number;

  @IsString()
  @Expose()
  name: string;

  @IsString()
  @IsOptional()
  @Expose()
  ip?: string;
}
