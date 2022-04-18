import BaseValidator from '../baseValidator';
import { NameValidator } from '../error/validationError';
import { messageMapper, Validator } from '../type';
import { addNeededValidateParams, addValidatorForParams } from '../utils/metadata';

class MinDigitsValidator extends BaseValidator implements Validator {
  protected name: NameValidator = NameValidator.MIN_DIGITS;
  protected errorMessage: string = messageMapper[NameValidator.MIN_DIGITS];
  private minDigits: number;

  public validateData(value: number): boolean {
    if (!value) return true;

    return value.toString().length >= this.minDigits;
  }

  public setMinDigits(minDigits: number): void {
    this.minDigits = minDigits;
    this.errorMessage = `${this.errorMessage} ${minDigits}`;
  }
}

function MinDigits<T extends Error>(minDigits: number, errorHandler?: T | string) {
  return function (target: unknown, propertyKey: string): void {
    addNeededValidateParams(target, propertyKey);

    const validator = new MinDigitsValidator();
    validator.setErrorHandler(errorHandler);
    validator.setMinDigits(minDigits);

    addValidatorForParams(target, propertyKey, validator);
  };
}

export { MinDigits };
