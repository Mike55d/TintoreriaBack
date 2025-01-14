import { Expose, Type } from 'class-transformer';
import { IsArray, IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { GarmentsDto } from './garments.dto';

export class CreateOrderDto {
  @Expose()
  @IsNumber()
  currencyId: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  clientId?: number;

  @Expose()
  @IsOptional()
  @IsDate()
  endDate: Date;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GarmentsDto)
  @Expose()
  garments?: GarmentsDto[];

  @Expose()
  @IsOptional()
  @IsNumber()
  payType?: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  statusId: number;
}
