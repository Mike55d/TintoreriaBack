export enum LogLevel {
  LOG,
  INFO,
  WARN,
  ERROR
}

export enum LogCategory {
  GENERIC,
  DB,
  OPS,
  SERVER
}

export enum LogSubCategory {
  GENERIC,

  SERVER_STARTUP = 100,
  SERVER_SHUTDOWN,
  SERVER_RESTART,
  SERVER_INTERNAL_ERROR,
  SERVER_SEND_CODE,

  AUTH = 200,
  UNAUTHORIZED,
  BAD_REQUEST,
  FORBIDDEN,
  ENTITY_NOT_FOUND,
  ENTITY_ALREADY_EXISTS,
  MAX_DATA_REACHED,
  LICENSES,
  FCM_NOTIFICATIONS,
  CONTACTS,
  GROUP
}
