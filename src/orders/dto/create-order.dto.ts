import { Expose, Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { GarmentsDto } from './garments.dto';

export class CreateOrderDto {
  @Expose()
  @IsNumber()
  currencyId: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GarmentsDto)
  @Expose()
  garments?: GarmentsDto[];
}
