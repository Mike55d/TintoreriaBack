import { HttpStatus } from '@nestjs/common';
import { LogCategory, LogSubCategory } from '../logs/logs.types';

export interface ErrorInterface {
  title: string;
  errorCode: number;
  httpError: HttpStatus;
  logCategory: LogCategory;
  logSubCategory: LogSubCategory;
  details?: Record<string, any>;
  description?: string;
}

export namespace Errors {
  export const NO_ERROR: ErrorInterface = {
    title: 'OK',
    errorCode: 0,
    httpError: HttpStatus.OK,
    logCategory: LogCategory.OPS,
    logSubCategory: LogSubCategory.GENERIC
  };

  export const INVALID_RESOURCES: ErrorInterface = {
    title: 'INVALID_RESOURCES',
    errorCode: 1,
    httpError: HttpStatus.BAD_REQUEST,
    logCategory: LogCategory.OPS,
    logSubCategory: LogSubCategory.BAD_REQUEST
  };

  export const CANNOT_SEND_EMAIL: ErrorInterface = {
    title: 'CANNOT_SEND_EMAIL',
    errorCode: 2,
    httpError: HttpStatus.INTERNAL_SERVER_ERROR,
    logCategory: LogCategory.SERVER,
    logSubCategory: LogSubCategory.SERVER_INTERNAL_ERROR
  };

  export const INVALID_JSON: ErrorInterface = {
    title: 'INVALID_JSON',
    errorCode: 3,
    httpError: HttpStatus.BAD_REQUEST,
    logCategory: LogCategory.OPS,
    logSubCategory: LogSubCategory.BAD_REQUEST
  };

  export const NON_EXISTENT_USER: ErrorInterface = {
    title: 'NON_EXISTENT_USER',
    errorCode: 4,
    httpError: HttpStatus.NOT_FOUND,
    logCategory: LogCategory.OPS,
    logSubCategory: LogSubCategory.ENTITY_NOT_FOUND
  };

  export const AUTH_UNSUCCESSFUL: ErrorInterface = {
    title: 'AUTH_UNSUCCESSFUL',
    errorCode: 5,
    httpError: HttpStatus.UNAUTHORIZED,
    logCategory: LogCategory.OPS,
    logSubCategory: LogSubCategory.AUTH
  };

  export const INVALID_TOKEN: ErrorInterface = {
    title: 'INVALID_TOKEN',
    errorCode: 6,
    httpError: HttpStatus.UNAUTHORIZED,
    logCategory: LogCategory.OPS,
    logSubCategory: LogSubCategory.UNAUTHORIZED
  };

  export const DEPRECATED_METHOD: ErrorInterface = {
    title: 'DEPRECATED_METHOD',
    errorCode: 7,
    httpError: HttpStatus.NOT_IMPLEMENTED,
    logCategory: LogCategory.OPS,
    logSubCategory: LogSubCategory.BAD_REQUEST
  };

  export const TOKEN_NOT_FOUND: ErrorInterface = {
    title: 'TOKEN_NOT_FOUND',
    errorCode: 8,
    httpError: HttpStatus.UNAUTHORIZED,
    logCategory: LogCategory.OPS,
    logSubCategory: LogSubCategory.UNAUTHORIZED
  };

  export const INVALID_DEVICE: ErrorInterface = {
    title: 'INVALID_DEVICE',
    errorCode: 9,
    httpError: HttpStatus.UNAUTHORIZED,
    logCategory: LogCategory.OPS,
    logSubCategory: LogSubCategory.UNAUTHORIZED
  };

  export const RESOURCE_NOT_FOUND: ErrorInterface = {
    title: 'RESOURCE_NOT_FOUND',
    errorCode: 10,
    httpError: HttpStatus.NOT_FOUND,
    logCategory: LogCategory.OPS,
    logSubCategory: LogSubCategory.ENTITY_NOT_FOUND
  };

  export const FORBIDDEN: ErrorInterface = {
    title: 'FORBIDDEN',
    errorCode: 11,
    httpError: HttpStatus.FORBIDDEN,
    logCategory: LogCategory.OPS,
    logSubCategory: LogSubCategory.FORBIDDEN
  };

  export const INVALID_STATUS: ErrorInterface = {
    title: 'INVALID_STATUS',
    errorCode: 12,
    httpError: HttpStatus.BAD_REQUEST,
    logCategory: LogCategory.OPS,
    logSubCategory: LogSubCategory.BAD_REQUEST
  };

  export const CANNOT_SEND_NOTIFICATION: ErrorInterface = {
    title: 'CANNOT_SEND_NOTIFICATION',
    errorCode: 13,
    httpError: HttpStatus.INTERNAL_SERVER_ERROR,
    logCategory: LogCategory.SERVER,
    logSubCategory: LogSubCategory.FCM_NOTIFICATIONS
  };

  export const FILE_TOO_LONG: ErrorInterface = {
    title: 'FILE_TOO_LONG',
    errorCode: 14,
    httpError: HttpStatus.UNPROCESSABLE_ENTITY,
    logCategory: LogCategory.OPS,
    logSubCategory: LogSubCategory.MAX_DATA_REACHED
  };

  export const INVALID_CLIENT_VERSION: ErrorInterface = {
    title: 'INVALID_CLIENT_VERSION',
    errorCode: 15,
    httpError: HttpStatus.BAD_REQUEST,
    logCategory: LogCategory.OPS,
    logSubCategory: LogSubCategory.BAD_REQUEST
  };

  export const INVALID_TYPE: ErrorInterface = {
    title: 'INVALID_TYPE',
    errorCode: 16,
    httpError: HttpStatus.BAD_REQUEST,
    logCategory: LogCategory.OPS,
    logSubCategory: LogSubCategory.BAD_REQUEST
  };

  export const AUTH_UNSUCCESSFUL_CONFLICT: ErrorInterface = {
    title: 'AUTH_UNSUCCESSFUL_CONFLICT',
    errorCode: 17,
    httpError: HttpStatus.UNAUTHORIZED,
    logCategory: LogCategory.OPS,
    logSubCategory: LogSubCategory.AUTH
  };

  export const ENTITY_ALREADY_EXISTS: ErrorInterface = {
    title: 'ENTITY_ALREADY_EXISTS',
    errorCode: 18,
    httpError: HttpStatus.CONFLICT,
    logCategory: LogCategory.OPS,
    logSubCategory: LogSubCategory.ENTITY_ALREADY_EXISTS
  };

  export const EXTERNAL_RESOURCE_ERROR: ErrorInterface = {
    title: 'EXTERNAL_RESOURCE_ERROR',
    errorCode: 19,
    httpError: HttpStatus.CONFLICT,
    logCategory: LogCategory.SERVER,
    logSubCategory: LogSubCategory.SERVER_INTERNAL_ERROR
  };

  export const MS_LOGIN_FAILED: ErrorInterface = {
    title: 'MS_LOGIN_FAILED',
    errorCode: 20,
    httpError: HttpStatus.INTERNAL_SERVER_ERROR,
    logCategory: LogCategory.SERVER,
    logSubCategory: LogSubCategory.UNAUTHORIZED
  };

  export const MS_GRAPH_REQUEST_FAILED: ErrorInterface = {
    title: 'MS_GRAPH_REQUEST_FAILED',
    errorCode: 21,
    httpError: HttpStatus.INTERNAL_SERVER_ERROR,
    logCategory: LogCategory.SERVER,
    logSubCategory: LogSubCategory.GENERIC
  };

  export const NO_TICKET_TEMPLATE: ErrorInterface = {
    title: 'NO_TICKET_TEMPLATE',
    errorCode: 22,
    httpError: HttpStatus.BAD_REQUEST,
    logCategory: LogCategory.OPS,
    logSubCategory: LogSubCategory.BAD_REQUEST
  };

  export const NO_IOC_TEMPLATE: ErrorInterface = {
    title: 'NO_IOC_TEMPLATE',
    errorCode: 23,
    httpError: HttpStatus.BAD_REQUEST,
    logCategory: LogCategory.OPS,
    logSubCategory: LogSubCategory.BAD_REQUEST
  };

  export const INTERNAL_ERROR: ErrorInterface = {
    title: 'INTERNAL_ERROR',
    errorCode: 999,
    httpError: HttpStatus.INTERNAL_SERVER_ERROR,
    logCategory: LogCategory.OPS,
    logSubCategory: LogSubCategory.SERVER_INTERNAL_ERROR
  };
}
