import { NameValidator, ValidationError, Validator } from './type';

abstract class BaseValidator implements Validator {
  protected name: NameValidator;
  protected errorMessage: string;
  protected errorHandler;

  abstract validateData(value: unknown): boolean;

  private validationErrorBuilder(path: string, message?: string): ValidationError {
    return {
      name: this.name,
      message: !message ? `${path} ${this.errorMessage}` : `${path} ${message}`,
      path,
    };
  }

  public get getName(): string {
    return this.name;
  }

  public setErrorHandler<T extends Error>(errorHandler?: T | string): void {
    this.errorHandler = errorHandler;
  }

  public executeErrorHandler(path:string): never {
    if (!this.errorHandler) {
      throw this.validationErrorBuilder(path);
    }

    if (typeof this.errorHandler === 'string') {
      throw this.validationErrorBuilder(path);
    }

    throw this.errorHandler;
  }

  // {
  //   if (!value) return true;

  //   return value instanceof String || typeof value === 'string';
  // }

  // public build(name: NameValidator): Validator {
  //   return {
  //     name,
  //     errorHandler: this.errorHandlerBuilder,
  //     validator: this.validateData,
  //   };
  // }
}

export default BaseValidator;
