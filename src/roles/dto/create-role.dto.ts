import { Expose } from 'class-transformer';
import { ArrayNotEmpty, ArrayUnique, IsIn, IsString, MaxLength } from 'class-validator';
import { ALL_PERMISSIONS, Permission } from '../roles.types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    example: 'Admin'
  })
  @IsString()
  @MaxLength(64)
  @Expose()
  name: string;

  @ApiProperty({
    type: [String],
    example: ['tickets:create', 'tickets:delete', 'tickets:read', 'tickets:update']
  })
  @Expose()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsIn(ALL_PERMISSIONS, { each: true })
  permissions: Permission[];
}
