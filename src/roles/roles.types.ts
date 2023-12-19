type LogsPermission = 'logs:read';

type UserPermission = 'users:read' | 'users:update' | 'users:delete' | 'users:create';

type ClientPermission = 'clients:read' | 'clients:update' | 'clients:delete' | 'clients:create';

type CommentsPermission = 'comments:delete';

type RolePermission = 'roles:read' | 'roles:update' | 'roles:delete' | 'roles:create';

type TicketsPermission = 'ticket:read' | 'ticket:update' | 'ticket:delete' | 'ticket:create';

export type Permission =
  | LogsPermission
  | UserPermission
  | ClientPermission
  | RolePermission
  | TicketsPermission
  | CommentsPermission;

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
  'comments:delete'
];

export enum BasicRoles {
  ADMIN = 'administrator',
  TECNICIAN = 'tecnician',
  SUPERVISOR = 'supervisor',
  CLIENT_READ_ONLY = 'client_read_only'
}
