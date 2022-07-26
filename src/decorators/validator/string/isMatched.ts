import BaseValidator from '../baseValidator';
import { NameValidator } from '../error/validationError';
import { messageMapper } from '../type';
import { addNeededValidateParams, addValidatorForParams } from '../../utils/metadata';

class MatchValidator extends BaseValidator {
  protected name: NameValidator = NameValidator.IS_MATCHED;
  protected errorMessage: string = messageMapper[NameValidator.IS_MATCHED];
  private pattern: RegExp;

  public validateData(value: string): boolean {
    return this.pattern.test(value);
  }

  public setPattern(pattern: RegExp): void {
    this.pattern = pattern;
    this.errorMessage = `${this.errorMessage} ${pattern}`;
  }
}

function IsMatched<T extends Error>(pattern: RegExp, errorHandler?: T | string) {
  return function (target: unknown, propertyKey: string): void {
    addNeededValidateParams(target, propertyKey);

    const validator = new MatchValidator();
    validator.setErrorHandler(errorHandler);
    validator.setPattern(pattern);

    addValidatorForParams(target, propertyKey, validator);
  };
}

export { IsMatched };
