import BaseValidator from '../baseValidator';
import { NameValidator } from '../error/validationError';
import { messageMapper, Validator } from '../type';
import { addNeededValidateParams, addValidatorForParams } from '../utils/metadata';

class LessValidator extends BaseValidator implements Validator {
  protected name: NameValidator = NameValidator.IS_LESS;
  protected errorMessage: string = messageMapper[NameValidator.IS_LESS];
  private lowerBound: number;

  public validateData(value: number): boolean {
    if (!value) return true;

    return value <= this.lowerBound;
  }

  public setLowerBound(lowerBound: number): void {
    this.lowerBound = lowerBound;
    this.errorMessage = `${this.errorMessage} ${lowerBound}`;
  }
}

function IsLess<T extends Error>(lowerBound: number, errorHandler?: T | string) {
  return function (target: unknown, propertyKey: string): void {
    addNeededValidateParams(target, propertyKey);

    const validator = new LessValidator();
    validator.setErrorHandler(errorHandler);
    validator.setLowerBound(lowerBound);

    addValidatorForParams(target, propertyKey, validator);
  };
}

export { IsLess };
