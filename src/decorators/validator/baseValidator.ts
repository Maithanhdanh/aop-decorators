import { ParamType } from './common/type';
import { NameValidator, ValidationError, Validator } from './type';

abstract class BaseValidator implements Validator {
  private type = ParamType.VALIDATOR;
  protected name: NameValidator;
  protected errorMessage: string;
  protected errorHandler;

  abstract validateData(value: string | unknown, pattern?: RegExp): boolean;

  protected validationErrorBuilder(path: string, message?: string): ValidationError {
    return {
      name: this.name,
      message: !message ? `${path} ${this.errorMessage}` : `${message}`,
      path,
    };
  }

  public get getType(): ParamType {
    return this.type;
  }

  public get getName(): string {
    return this.name;
  }

  private executeErrorHandler(path: string): never {
    if (!this.errorHandler) {
      throw this.validationErrorBuilder(path);
    }

    if (typeof this.errorHandler === 'string') {
      throw this.validationErrorBuilder(path, this.errorHandler);
    }

    throw this.errorHandler;
  }

  public setErrorHandler<T extends Error>(errorHandler?: T | string): void {
    this.errorHandler = errorHandler;
  }

  public process(value: unknown, path: string): void {
    if (!this.validateData(value)) {
      throw this.executeErrorHandler(path);
    }
  }
}

export default BaseValidator;
