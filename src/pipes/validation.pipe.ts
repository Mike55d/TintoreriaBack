import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CustomError } from '../errors/custom-error';
import { Errors } from '../errors/errors.types';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value, {
      strategy: 'excludeAll',
      enableImplicitConversion: true
    });

    const errors = await validate(object, {
      stopAtFirstError: true
    });

    if (errors.length > 0) {
      let reason = errors[0].constraints
        ? Object.values(errors[0].constraints)[0]
        : errors[0].toString();
      throw new CustomError(Errors.INVALID_RESOURCES, {
        details: {
          message: 'Validation failed',
          reason,
          field: errors[0].property,
          value: errors[0].value
        }
      });
    }
    return object;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
