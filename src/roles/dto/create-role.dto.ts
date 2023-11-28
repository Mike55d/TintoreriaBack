import { Expose } from 'class-transformer';
import { ArrayNotEmpty, ArrayUnique, IsIn, IsString, MaxLength } from 'class-validator';
import { ALL_PERMISSIONS, Permission } from '../roles.types';

export class CreateRoleDto {
  @IsString()
  @MaxLength(64)
  @Expose()
  name: string;

  @Expose()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsIn(ALL_PERMISSIONS, { each: true })
  permissions: Permission[];
}
