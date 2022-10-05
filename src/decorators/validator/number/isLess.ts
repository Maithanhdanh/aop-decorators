import BaseValidator from '../baseValidator';
import { NameValidator } from '../error/validationError';
import { validate } from '../method';
import { required } from '../parameter';
import { messageMapper, Validator } from '../type';
import { addNeededValidateParams, addHandlerForParams } from '../../utils/metadata';

class LessValidator extends BaseValidator implements Validator {
  protected name: NameValidator = NameValidator.IS_LESS;
  protected errorMessage: string = messageMapper[NameValidator.IS_LESS];
  private lowerBound: number;

  @validate
  public validateData(@required(true) value: number): boolean {
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

    addHandlerForParams(target, propertyKey, validator);
  };
}

export { IsLess };
