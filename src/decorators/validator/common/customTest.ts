import BaseValidator from '../baseValidator';
import { NameValidator } from '../error/validationError';
import { messageMapper, ValidationError } from '../type';
import { addNeededValidateParams, addValidatorForParams } from '../utils/metadata';

class TestValidator extends BaseValidator {
  protected name: NameValidator = NameValidator.CUSTOM_TEST;
  protected errorMessage: string = messageMapper[NameValidator.CUSTOM_TEST];
  private customTestName: string;
  private customTest: (value: any) => boolean;

  protected validationErrorBuilder(path: string, message?: string): ValidationError {
    return {
      name: this.customTestName,
      message: !message ? `${path} ${this.errorMessage}` : `${path} ${message}`,
      path,
    };
  }

  public validateData(value: unknown): boolean {
    return this.customTest(value);
  }

  public setCustomTest(test: (value: any) => boolean): void {
    this.customTest = test;
    this.customTestName = test.name;
  }
}

function Test<T extends Error>(customTest: (value: any) => boolean, errorHandler?: T | string) {
  return function (target: any, propertyKey: string) {
    addNeededValidateParams(target, propertyKey);

    const validator = new TestValidator();
    validator.setErrorHandler(errorHandler);
    validator.setCustomTest(customTest);

    addValidatorForParams(target, propertyKey, validator);
  };
}

export { Test };
