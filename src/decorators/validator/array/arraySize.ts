import BaseValidator from '../baseValidator';
import { NameValidator } from '../error/validationError';
import { required } from '../parameter';
import { messageMapper, Validator } from '../type';
import { addNeededValidateParams, addValidatorForParams } from '../../utils/metadata';
import { validate } from '../method';

interface SizeData {
  max?: number;
  min?: number;
}

class ArraySizeValidator extends BaseValidator implements Validator {
  protected name: NameValidator = NameValidator.SIZE;
  protected errorMessage: string = messageMapper[NameValidator.SIZE];
  private max: number;
  private min: number;

  @validate
  public validateData(@required(true) value: string): boolean {
    if (this.max < this.min) {
      return false;
    }

    if (this.max && this.min) {
      return this.min <= value.length && value.length <= this.max;
    }

    if (this.max) {
      return value.length <= this.max;
    }

    if (this.min) {
      return this.min <= value.length;
    }

    return false;
  }

  public setSize(size: SizeData): void {
    const { max, min } = size;
    this.max = max;
    this.min = min;

    if (!max && !min) {
      this.errorMessage = `size validator has no boundary`;
    }

    if (max < min) {
      this.errorMessage = `size validator has max boundary less than min boundary`;
    } else {
      this.errorMessage = `${this.errorMessage}${max ? ' less than ' + max : ''}${max && min ? ',' : ''}${
        min ? ' greater than ' + min : ''
      }`;
    }
  }
}

function ArraySize<T extends Error>(size: SizeData, errorHandler?: T | string) {
  return function (target: unknown, propertyKey: string): void {
    addNeededValidateParams(target, propertyKey);

    const validator = new ArraySizeValidator();
    validator.setErrorHandler(errorHandler);
    validator.setSize(size);

    addValidatorForParams(target, propertyKey, validator);
  };
}

export { ArraySize };
