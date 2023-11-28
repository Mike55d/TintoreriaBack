import { SetMetadata } from '@nestjs/common';
import { Permission } from '../../roles/roles.types';

export const PERMISSIONS_KEY = 'PERMSSIONS_KEY';
export const Permissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
