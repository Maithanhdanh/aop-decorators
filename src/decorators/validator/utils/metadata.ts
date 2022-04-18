import { validationMetadataKey, Validator } from '../type';

const addNeededValidateParams = (target: any, key: string): void => {
  const neededValidateParams: string[] =
    Reflect.getOwnMetadata(validationMetadataKey.PARAMS, target, validationMetadataKey.PARAMS) || [];
  neededValidateParams.push(key);
  Reflect.defineMetadata(validationMetadataKey.PARAMS, neededValidateParams, target, validationMetadataKey.PARAMS);
};

const addValidatorForParams = (target: any, key: string, validator: Validator): void => {
  const validators = Reflect.getOwnMetadata(validationMetadataKey.VALIDATOR, target, key) || [];
  validators.push(validator);
  Reflect.defineMetadata(validationMetadataKey.VALIDATOR, validators, target, key);
};
export { addNeededValidateParams, addValidatorForParams };
