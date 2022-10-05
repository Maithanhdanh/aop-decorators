import BaseValidator from '../baseValidator';
import { NameValidator } from '../error/validationError';
import { messageMapper } from '../type';
import { addNeededValidateParams, addHandlerForParams } from '../../utils/metadata';

class RequireValidator extends BaseValidator {
  protected name: NameValidator = NameValidator.IS_REQUIRED;
  protected errorMessage: string = messageMapper[NameValidator.IS_REQUIRED];

  public validateData(value: unknown): boolean {
    return !value ? false : true;
  }
}

function IsRequired<T extends Error>(errorHandler?: T | string) {
  return function (target: any, propertyKey: string) {
    addNeededValidateParams(target, propertyKey);

    const validator = new RequireValidator();
    validator.setErrorHandler(errorHandler);

    addHandlerForParams(target, propertyKey, validator);
  };
}

export { IsRequired };
