import BaseValidator from '../baseValidator';
import { validateSchema } from '../common/validateSchema';
import { validate } from '../method';
import { required } from '../parameter';
import { messageMapper, NameValidator, ValidationError, Validator } from '../type';
import { addNeededValidateParams, addValidatorForParams } from '../../utils/metadata';

class ValidObjectValidator extends BaseValidator implements Validator {
  protected name: NameValidator = NameValidator.IS_VALID_OBJECT;
  protected errorMessage: string = messageMapper[NameValidator.IS_VALID_OBJECT];
  private invalidFieldError: ValidationError;
  private template: unknown;

  protected validationErrorBuilder(path: string, message?: string): ValidationError {
    return {
      name: this.name,
      message: !message ? `${this.invalidFieldError.message}` : `${message}`,
      path: `${path}.${this.invalidFieldError.path}`,
    };
  }

  @validate
  public validateData(@required(true) value: unknown): boolean {
    try {
      validateSchema(this.template, value);
      return true;
    } catch (err) {
      this.invalidFieldError = err;
      return false;
    }
  }

  public setTemplate(template: unknown): void {
    this.template = template;
  }
}

function IsValidObject<T extends Error>(errorHandler?: T | string) {
  return function (target: unknown, propertyKey: string): void {
    addNeededValidateParams(target, propertyKey);

    const validator = new ValidObjectValidator();
    const propertyType = Reflect.getMetadata('design:type', target, propertyKey);
    validator.setErrorHandler(errorHandler);
    validator.setTemplate(propertyType);

    addValidatorForParams(target, propertyKey, validator);
  };
}

export { IsValidObject };
