import BaseValidator from '../baseValidator';
import { NameValidator } from '../error/validationError';
import { validate } from '../method';
import { required } from '../parameter';
import { messageMapper, Validator } from '../type';
import { addNeededValidateParams, addValidatorForParams } from '../../utils/metadata';

class StringValidator extends BaseValidator implements Validator {
  protected name: NameValidator = NameValidator.IS_STRING;
  protected errorMessage: string = messageMapper[NameValidator.IS_STRING];

  @validate
  public validateData(@required(true) value: unknown): boolean {
    return value instanceof String || typeof value === 'string';
  }
}

function IsString<T extends Error>(errorHandler?: T | string) {
  return function (target: unknown, propertyKey: string): void {
    addNeededValidateParams(target, propertyKey);

    const validator = new StringValidator();
    validator.setErrorHandler(errorHandler);

    addValidatorForParams(target, propertyKey, validator);
  };
}

export { IsString };
