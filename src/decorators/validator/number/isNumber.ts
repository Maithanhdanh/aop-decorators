import BaseValidator from '../baseValidator';
import { NameValidator } from '../error/validationError';
import { messageMapper, Validator } from '../type';
import { addNeededValidateParams, addValidatorForParams } from '../utils/metadata';

class NumberValidator extends BaseValidator implements Validator {
  protected name: NameValidator = NameValidator.IS_NUMBER;
  protected errorMessage: string = messageMapper[NameValidator.IS_NUMBER];

  public validateData(value: string): boolean {
    if (!value) return true;

    return typeof value === 'number';
  }
}

function IsNumber<T extends Error>(errorHandler?: T | string) {
  return function (target: unknown, propertyKey: string): void {
    addNeededValidateParams(target, propertyKey);

    const validator = new NumberValidator();
    validator.setErrorHandler(errorHandler);

    addValidatorForParams(target, propertyKey, validator);
  };
}

export { IsNumber };
