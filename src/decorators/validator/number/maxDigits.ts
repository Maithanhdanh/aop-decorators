import BaseValidator from '../baseValidator';
import { NameValidator } from '../error/validationError';
import { validate } from '../method';
import { required } from '../parameter';
import { messageMapper, Validator } from '../type';
import { addNeededValidateParams, addValidatorForParams } from '../utils/metadata';

class MaxDigitsValidator extends BaseValidator implements Validator {
  protected name: NameValidator = NameValidator.MAX_DIGITS;
  protected errorMessage: string = messageMapper[NameValidator.MAX_DIGITS];
  private maxDigits: number;

  @validate
  public validateData(@required(true) value: number): boolean {
    return value.toString().length <= this.maxDigits;
  }

  public setMaxDigits(maxDigits: number): void {
    this.maxDigits = maxDigits;
    this.errorMessage = `${this.errorMessage} ${maxDigits}`;
  }
}

function MaxDigits<T extends Error>(maxDigits: number, errorHandler?: T | string) {
  return function (target: unknown, propertyKey: string): void {
    addNeededValidateParams(target, propertyKey);

    const validator = new MaxDigitsValidator();
    validator.setErrorHandler(errorHandler);
    validator.setMaxDigits(maxDigits);

    addValidatorForParams(target, propertyKey, validator);
  };
}

export { MaxDigits };
