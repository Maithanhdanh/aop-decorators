import { transformMetadataKey } from '../validator/transform/type';
import { validationMetadataKey, Validator } from '../validator/type';

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

const addNeededTransformParams = (target: any, key: string): void => {
  const neededTransformParams: string[] =
    Reflect.getOwnMetadata(transformMetadataKey.TRANSFORM, target, transformMetadataKey.TRANSFORM) || [];
  neededTransformParams.push(key);
  Reflect.defineMetadata(transformMetadataKey.TRANSFORM, neededTransformParams, target, transformMetadataKey.TRANSFORM);
};

const addTransformHandlerParams = (target: any, key: string, handler: any): void => {
  const handlers = Reflect.getOwnMetadata(transformMetadataKey.HANDLER, target, transformMetadataKey.HANDLER) || [];
  handlers.push(handler);
  Reflect.defineMetadata(transformMetadataKey.HANDLER, handlers, target, key);
};

export { addNeededValidateParams, addValidatorForParams, addNeededTransformParams, addTransformHandlerParams };
