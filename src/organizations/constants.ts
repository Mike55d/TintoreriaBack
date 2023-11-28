export const defaultRolesOrg = [
  {
    name: 'Administrador',
    permissions:
      'clients:create,clients:delete,clients:read,clients:update,logs:read,products:create,products:delete,products:read,products:update,roles:create,roles:delete,roles:read,roles:update,users:create,users:delete,users:read,users:update,survey_templates:read,survey_templates:update,survey_templates:delete,survey_templates:create,credentials:read,credentials:update,credentials:delete,credentials:create,currencies:update,currencies:create,currencies:read,reports:read,settings:update,settings:read',
    readonly: true
  },
  {
    name: 'Solo lectura',
    permissions:
      'clients:read,logs:read,products:read,roles:read,users:read,survey_templates:read,credentials:read',
    readonly: true
  },
  {
    name: 'Administrador de clientes',
    permissions:
      'clients:create,clients:delete,clients:read,clients:update,products:create,products:delete,products:read,products:update,roles:read,users:read,survey_templates:read',
    readonly: true
  },
  {
    name: 'Solo lectura de clientes',
    permissions: 'clients:read,products:read,users:read',
    readonly: true
  },
  {
    name: 'Administrador de usuarios',
    permissions: 'roles:read,users:create,users:delete,users:read,users:update',
    readonly: true
  },
  {
    name: 'Administrador de roles y permisos',
    permissions: 'roles:create,roles:delete,roles:read,roles:update,users:read',
    readonly: true
  },
];
