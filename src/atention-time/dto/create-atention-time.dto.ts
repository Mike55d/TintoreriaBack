import { Expose, Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator';

export class CreateAtentionTimeDto {
  @IsNumber()
  @IsOptional()
  @Expose()
  id?: number;

  @IsNumber()
  @Expose()
  time: number;

  @IsNumber()
  @Expose()
  typeTime: number;

  @IsNumber()
  @Expose()
  type: number;

  @IsNumber()
  @Expose()
  priority: number;
}

export class AtentionTimeDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAtentionTimeDto)
  @Expose()
  values: CreateAtentionTimeDto[];
}
