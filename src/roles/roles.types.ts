type LogsPermission = 'logs:read';

type UserPermission = 'users:read' | 'users:update' | 'users:delete' | 'users:create';

type ClientPermission = 'clients:read' | 'clients:update' | 'clients:delete' | 'clients:create';

type CommentsPermission = 'comments:delete';

type RolePermission = 'roles:read' | 'roles:update' | 'roles:delete' | 'roles:create';

type TicketsPermission = 'ticket:read' | 'ticket:update' | 'ticket:delete' | 'ticket:create';

type SettingsPermission = 'settings:read' | 'settings:update';

export type Permission =
  | LogsPermission
  | UserPermission
  | ClientPermission
  | RolePermission
  | TicketsPermission
  | CommentsPermission
  | SettingsPermission;

export const ALL_PERMISSIONS: Permission[] = [
  'clients:create',
  'clients:delete',
  'clients:read',
  'clients:update',
  'logs:read',
  'roles:create',
  'roles:delete',
  'roles:read',
  'roles:update',
  'users:create',
  'users:delete',
  'users:read',
  'users:update',
  'ticket:read',
  'ticket:update',
  'ticket:delete',
  'ticket:create',
  'comments:delete',
  'settings:read',
  'settings:update'
];

export enum BasicRoles {
  ADMIN = 'administrator',
  TECNICIAN = 'tecnician',
  SUPERVISOR = 'supervisor',
  CLIENT_READ_ONLY = 'client_read_only'
}

export const adminPermissions: Permission[] = [
  'clients:create',
  'clients:delete',
  'clients:read',
  'clients:update',
  'logs:read',
  'roles:create',
  'roles:delete',
  'roles:read',
  'roles:update',
  'users:create',
  'users:delete',
  'users:read',
  'users:update',
  'ticket:read',
  'ticket:update',
  'ticket:delete',
  'ticket:create',
  'comments:delete',
  'settings:read',
  'settings:update'
];

export const supervisorPermissions: Permission[] = [
  'clients:create',
  'clients:delete',
  'clients:read',
  'clients:update',
  'logs:read',
  'roles:create',
  'roles:delete',
  'roles:read',
  'roles:update',
  'ticket:read',
  'ticket:update',
  'ticket:delete',
  'ticket:create',
  'comments:delete'
];

export const tecnicianPermissions: Permission[] = [
  'clients:create',
  'clients:delete',
  'clients:read',
  'clients:update',
  'logs:read',
  'roles:create',
  'roles:delete',
  'roles:read',
  'roles:update',
  'ticket:read',
  'ticket:update',
  'ticket:create'
];

export const readOnlyPermissions: Permission[] = [
  'clients:read',
  'logs:read',
  'roles:read',
  'users:read',
  'ticket:read',
  'settings:read'
];
