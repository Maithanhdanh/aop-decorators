import BaseValidator from '../baseValidator';
import { NameValidator } from '../error/validationError';
import { validate } from '../method';
import { required } from '../parameter';
import { messageMapper, Validator } from '../type';
import { addNeededValidateParams, addHandlerForParams } from '../../utils/metadata';

class MinDigitsValidator extends BaseValidator implements Validator {
  protected name: NameValidator = NameValidator.MIN_DIGITS;
  protected errorMessage: string = messageMapper[NameValidator.MIN_DIGITS];
  private minDigits: number;

  @validate
  public validateData(@required(true) value: number): boolean {
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

    addHandlerForParams(target, propertyKey, validator);
  };
}

export { MinDigits };
