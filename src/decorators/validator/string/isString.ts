import BaseValidator from '../baseValidator';
import { NameValidator } from '../error/validationError';
import { messageMapper, Validator } from '../type';
import { addNeededValidateParams, addValidatorForParams } from '../utils/metadata';

class IsStringValidator extends BaseValidator implements Validator {
  protected name: NameValidator = NameValidator.IS_STRING;
  protected errorMessage: string = messageMapper[NameValidator.IS_STRING];

  public validateData(value: unknown): boolean {
    if (!value) return true;

    return value instanceof String || typeof value === 'string';
  }
}

function IsString<T extends Error>(errorHandler?: T | string) {
  return function (target: unknown, propertyKey: string): void {
    addNeededValidateParams(target, propertyKey);

    const validator = new IsStringValidator();
    validator.setErrorHandler(errorHandler);

    addValidatorForParams(target, propertyKey, validator);
  };
}

export { IsString };
