type LogsPermission = 'logs:read';

type UserPermission = 'users:read' | 'users:update' | 'users:delete' | 'users:create';

type ClientPermission = 'clients:read' | 'clients:update' | 'clients:delete' | 'clients:create';

type OrgCurrenciesPermissions = 'currencies:update' | 'currencies:create' | 'currencies:read';

type ProductPermission =
  | 'products:read'
  | 'products:update'
  | 'products:delete'
  | 'products:create';

type CommentsPermission = 'comments:delete';

type RolePermission = 'roles:read' | 'roles:update' | 'roles:delete' | 'roles:create';

type SurveyTemplatesPermission =
  | 'survey_templates:read'
  | 'survey_templates:update'
  | 'survey_templates:delete'
  | 'survey_templates:create';

type CredentialsPermission =
  | 'credentials:read'
  | 'credentials:update'
  | 'credentials:delete'
  | 'credentials:create';

type SettingsPermissions = 'settings:update' | 'settings:read';

type ReportsPermissions = 'reports:read';

export type Permission =
  | LogsPermission
  | UserPermission
  | ClientPermission
  | ProductPermission
  | RolePermission
  | SurveyTemplatesPermission
  | CredentialsPermission
  | SettingsPermissions
  | OrgCurrenciesPermissions
  | ReportsPermissions
  | CommentsPermission;

export const ALL_PERMISSIONS: Permission[] = [
  'clients:create',
  'clients:delete',
  'clients:read',
  'clients:update',
  'logs:read',
  'products:create',
  'products:delete',
  'products:read',
  'products:update',
  'roles:create',
  'roles:delete',
  'roles:read',
  'roles:update',
  'users:create',
  'users:delete',
  'users:read',
  'users:update',
  'survey_templates:read',
  'survey_templates:update',
  'survey_templates:delete',
  'survey_templates:create',
  'credentials:read',
  'credentials:update',
  'credentials:delete',
  'credentials:create',
  'currencies:update',
  'currencies:create',
  'currencies:read',
  'reports:read',
  'settings:update',
  'settings:read',
  'comments:delete'
];

export enum BasicRoles {
  ADMIN = 'administrator',
  READ_ONLY = 'read_only',
  CLIENT_MANAGER = 'client_manager',
  CLIENT_READ_ONLY = 'client_read_only',
  USER_MANAGER = 'user_manager',
  ROLES_MANAGER = 'roles_manager'
}
