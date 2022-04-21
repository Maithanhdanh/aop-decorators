import BaseValidator from '../baseValidator';
import { NameValidator } from '../error/validationError';
import { validate } from '../method';
import { required } from '../parameter';
import { messageMapper, Validator } from '../type';
import { addNeededValidateParams, addValidatorForParams } from '../utils/metadata';

class MinStringSizeValidator extends BaseValidator implements Validator {
  protected name: NameValidator = NameValidator.MIN_SIZE;
  protected errorMessage: string = messageMapper[NameValidator.MIN_SIZE];
  private minSize: number;

  @validate
  public validateData(@required(true) value: string): boolean {
    return value.length >= this.minSize;
  }

  public setMinSize(minSize: number): void {
    this.minSize = minSize;
    this.errorMessage = `${this.errorMessage} ${minSize}`;
  }
}

function MinStringSize<T extends Error>(minSize: number, errorHandler?: T | string) {
  return function (target: unknown, propertyKey: string): void {
    addNeededValidateParams(target, propertyKey);

    const validator = new MinStringSizeValidator();
    validator.setErrorHandler(errorHandler);
    validator.setMinSize(minSize);

    addValidatorForParams(target, propertyKey, validator);
  };
}

export { MinStringSize };
