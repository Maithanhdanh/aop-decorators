import BaseValidator from '../baseValidator';
import { NameValidator } from '../error/validationError';
import { messageMapper, Validator } from '../type';
import { addNeededValidateParams, addValidatorForParams } from '../utils/metadata';

class MaxStringSizeValidator extends BaseValidator implements Validator {
  protected name: NameValidator = NameValidator.MAX_SIZE;
  protected errorMessage: string = messageMapper[NameValidator.MAX_SIZE];
  private maxSize: number;

  public validateData(value: string): boolean {
    if (!value) return true;
    
    return value.length <= this.maxSize;
  }

  public setMaxSize(maxSize: number): void {
    this.maxSize = maxSize;
    this.errorMessage = `${this.errorMessage} ${maxSize}`;
  }
}

function MaxStringSize<T extends Error>(maxSize: number, errorHandler?: T | string) {
  return function (target: unknown, propertyKey: string): void {
    addNeededValidateParams(target, propertyKey);

    const validator = new MaxStringSizeValidator();
    validator.setErrorHandler(errorHandler);
    validator.setMaxSize(maxSize);

    addValidatorForParams(target, propertyKey, validator);
  };
}

export { MaxStringSize };
