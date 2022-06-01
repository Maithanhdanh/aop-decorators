import BaseValidator from '../baseValidator';
import { NameValidator } from '../error/validationError';
import { validate } from '../method';
import { required } from '../parameter';
import { messageMapper } from '../type';
import { addNeededValidateParams, addValidatorForParams } from '../../utils/metadata';

class EmailValidator extends BaseValidator {
  protected name: NameValidator = NameValidator.IS_EMAIL;
  protected errorMessage: string = messageMapper[NameValidator.IS_EMAIL];
  private pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  @validate
  public validateData(@required(true) value: string): boolean {
    return this.pattern.test(value);
  }
}

function IsEmail<T extends Error>(errorHandler?: T | string) {
  return function (target: unknown, propertyKey: string): void {
    addNeededValidateParams(target, propertyKey);

    const validator = new EmailValidator();
    validator.setErrorHandler(errorHandler);

    addValidatorForParams(target, propertyKey, validator);
  };
}

export { IsEmail };
