import { validationMetadataKey } from '../validator/type';

const addNeededValidateParams = (target: any, key: string): void => {
  const neededValidateParams: string[] =
    Reflect.getOwnMetadata(validationMetadataKey.PARAMS, target, validationMetadataKey.PARAMS) || [];
  neededValidateParams.unshift(key);
  Reflect.defineMetadata(validationMetadataKey.PARAMS, neededValidateParams, target, validationMetadataKey.PARAMS);
};

const addValidatorForParams = (target: any, key: string, validator: any): void => {
  const validators = Reflect.getOwnMetadata(validationMetadataKey.VALIDATOR, target, key) || [];
  validators.unshift(validator);
  Reflect.defineMetadata(validationMetadataKey.VALIDATOR, validators, target, key);
};

export { addNeededValidateParams, addValidatorForParams };
