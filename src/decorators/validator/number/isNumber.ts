import BaseValidator from '../baseValidator';
import { NameValidator } from '../error/validationError';
import { validate } from '../method';
import { required } from '../parameter';
import { messageMapper, Validator } from '../type';
import { addNeededValidateParams, addHandlerForParams } from '../../utils/metadata';

class NumberValidator extends BaseValidator implements Validator {
  protected name: NameValidator = NameValidator.IS_NUMBER;
  protected errorMessage: string = messageMapper[NameValidator.IS_NUMBER];

  @validate
  public validateData(@required(true) value: string): boolean {
    return typeof value === 'number';
  }
}

function IsNumber<T extends Error>(errorHandler?: T | string) {
  return function (target: unknown, propertyKey: string): void {
    addNeededValidateParams(target, propertyKey);

    const validator = new NumberValidator();
    validator.setErrorHandler(errorHandler);

    addHandlerForParams(target, propertyKey, validator);
  };
}

export { IsNumber };
