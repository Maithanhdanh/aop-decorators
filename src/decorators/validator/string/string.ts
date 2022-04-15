import BaseValidator from '../baseValidator';
import { NameValidator } from '../error/validationError';
import { messageMapper, validationMetadataKey, Validator } from '../type';

export class StringValidator extends BaseValidator implements Validator {
  protected name: NameValidator = NameValidator.IS_STRING;
  protected errorMessage: string = messageMapper[NameValidator.IS_STRING];

  public validateData(value: unknown): boolean {
    if (!value) return true;

    return value instanceof String || typeof value === 'string';
  }
}

function isString<T extends Error>(errorHandler?: T | string) {
  return function (target: any, propertyKey: string) {
    const neededValidateParams: string[] =
      Reflect.getOwnMetadata(validationMetadataKey.PARAMS, target, validationMetadataKey.PARAMS) || [];
    neededValidateParams.push(propertyKey);
    Reflect.defineMetadata(validationMetadataKey.PARAMS, neededValidateParams, target, validationMetadataKey.PARAMS);

    const validator = new StringValidator();
    validator.setErrorHandler(errorHandler);

    // const validator: Validator = {
    //   name: NameValidator.IS_STRING,
    //   errorHandler: () => errorHandlerBuilder<T>(NameValidator.IS_STRING, propertyKey, errorHandler),
    //   validator: (value: unknown): boolean => isStringValidator(value),
    // };

    Reflect.defineMetadata(validationMetadataKey.VALIDATOR, validator, target, propertyKey);
  };
}

const validateSchema = (target: any, inputData: any) => {
  const neededValidateParams: string[] = Reflect.getOwnMetadata(
    validationMetadataKey.PARAMS,
    target.prototype,
    validationMetadataKey.PARAMS,
  );

  for (const param of neededValidateParams) {
    const validator: Validator = Reflect.getOwnMetadata(validationMetadataKey.VALIDATOR, target.prototype, param);
    if (!validator.validateData(inputData[param])) {
      throw validator.executeErrorHandler(inputData[param]);
    }
  }
};

export { isString, validateSchema };
