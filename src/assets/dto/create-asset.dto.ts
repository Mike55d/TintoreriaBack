import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateAssetDto {
  @IsString()
  @Expose()
  name: string;

  @IsString()
  @Expose()
  type: string;

  @IsNumber()
  @Expose()
  assetType: number;
}
