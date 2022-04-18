import BaseValidator from '../baseValidator';
import { NameValidator } from '../error/validationError';
import { validate } from '../method';
import { required } from '../parameter';
import { messageMapper, Validator } from '../type';
import { addNeededValidateParams, addValidatorForParams } from '../utils/metadata';

class LargerValidator extends BaseValidator implements Validator {
  protected name: NameValidator = NameValidator.IS_LARGER;
  protected errorMessage: string = messageMapper[NameValidator.IS_LARGER];
  private upperBound: number;

  @validate
  public validateData(@required(true) value: number): boolean {
    return value >= this.upperBound;
  }

  public setLowerBound(upperBound: number): void {
    this.upperBound = upperBound;
    this.errorMessage = `${this.errorMessage} ${upperBound}`;
  }
}

function IsLarger<T extends Error>(upperBound: number, errorHandler?: T | string) {
  return function (target: unknown, propertyKey: string): void {
    addNeededValidateParams(target, propertyKey);

    const validator = new LargerValidator();
    validator.setErrorHandler(errorHandler);
    validator.setLowerBound(upperBound);

    addValidatorForParams(target, propertyKey, validator);
  };
}

export { IsLarger };
