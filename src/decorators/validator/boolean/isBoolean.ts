import BaseValidator from '../baseValidator';
import { NameValidator } from '../error/validationError';
import { validate } from '../method';
import { required } from '../parameter';
import { messageMapper, Validator } from '../type';
import { addNeededValidateParams, addValidatorForParams } from '../../utils/metadata';

class BooleanValidator extends BaseValidator implements Validator {
  protected name: NameValidator = NameValidator.IS_BOOLEAN;
  protected errorMessage: string = messageMapper[NameValidator.IS_BOOLEAN];

  @validate
  public validateData(@required(true) value: unknown): boolean {
    return value instanceof Boolean || typeof value === 'boolean';
  }
}

function IsBoolean<T extends Error>(errorHandler?: T | string) {
  return function (target: unknown, propertyKey: string): void {
    addNeededValidateParams(target, propertyKey);

    const validator = new BooleanValidator();
    validator.setErrorHandler(errorHandler);

    addValidatorForParams(target, propertyKey, validator);
  };
}

export { IsBoolean };
