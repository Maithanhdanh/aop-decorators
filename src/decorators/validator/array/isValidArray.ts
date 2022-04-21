import BaseValidator from '../baseValidator';
import { validateSchema } from '../common';
import { validate } from '../method';
import { required } from '../parameter';
import { messageMapper, NameValidator, ValidationError, Validator } from '../type';
import { addNeededValidateParams, addValidatorForParams } from '../utils/metadata';

const primitiveTypes = ['string', 'number', 'boolean'];

class ValidObjectValidator extends BaseValidator implements Validator {
  protected name: NameValidator = NameValidator.IS_VALID_ARRAY;
  protected errorMessage: string = messageMapper[NameValidator.IS_VALID_ARRAY];
  private invalidFieldError: ValidationError;
  private typeElement: unknown;

  protected validationErrorBuilder(path: string, message?: string): ValidationError {
    return {
      name: this.name,
      message: !message ? `${this.invalidFieldError.message}` : `${message}`,
      path: `${path}${this.invalidFieldError.path}`,
    };
  }

  @validate
  public validateData(@required(true) elements: unknown[]): boolean {
    if (!(elements instanceof Array)) {
      return false;
    }

    for (const index in elements) {
      if (primitiveTypes.includes(typeof elements[index])) {
        if (typeof elements[index] !== (this.typeElement as any).name.toLowerCase()) {
          this.invalidFieldError = {
            name: this.name,
            message: this.errorMessage,
            path: `[${index}]`,
          };
          return false;
        }
      } else {
        try {
          validateSchema(this.typeElement, elements[index]);
        } catch (err) {
          this.invalidFieldError = err;
          this.invalidFieldError.path = `[${index}].${err.path}`;
          return false;
        }
      }
    }

    return true;
  }

  public setTypeElement(typeElement: unknown): void {
    this.typeElement = typeElement;
  }
}

function IsValidArray<T extends Error>(type: any, errorHandler?: T | string) {
  return function (target: unknown, propertyKey: string): void {
    addNeededValidateParams(target, propertyKey);

    const validator = new ValidObjectValidator();
    validator.setErrorHandler(errorHandler);
    validator.setTypeElement(type);

    addValidatorForParams(target, propertyKey, validator);
  };
}

export { IsValidArray };
