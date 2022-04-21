import { NameValidator, ValidationError, Validator } from './type';

abstract class BaseValidator implements Validator {
  protected name: NameValidator;
  protected errorMessage: string;
  protected errorHandler;

  abstract validateData(value: string | unknown, pattern?: RegExp): boolean;

  protected validationErrorBuilder(path: string, message?: string): ValidationError {
    return {
      name: this.name,
      message: !message ? `${path} ${this.errorMessage}` : `${path} ${message}`,
      path,
    };
  }

  public get getName(): string {
    return this.name;
  }

  private executeErrorHandler(path: string): never {
    if (!this.errorHandler) {
      throw this.validationErrorBuilder(path);
    }

    if (typeof this.errorHandler === 'string') {
      throw this.validationErrorBuilder(path);
    }

    throw this.errorHandler;
  }

  public setErrorHandler<T extends Error>(errorHandler?: T | string): void {
    this.errorHandler = errorHandler;
  }

  public validate(value: unknown, path: string): void {
    if (!this.validateData(value)) {
      throw this.executeErrorHandler(path);
    }
  }
}

export default BaseValidator;
