import { transformMetadataKey } from '../transform/type';
import { validationMetadataKey, Validator } from '../type';

const validateSchema = (target: any, inputData: any) => {
  const neededValidateParams: string[] = Reflect.getOwnMetadata(
    validationMetadataKey.PARAMS,
    target.prototype,
    validationMetadataKey.PARAMS,
  );

  neededValidateParams?.forEach((param) => {
    const validators: Validator[] = Reflect.getOwnMetadata(validationMetadataKey.VALIDATOR, target.prototype, param);
    validators.forEach((validator) => validator.validate(inputData[param], param));
  });

  const neededTransformParams: string[] = Reflect.getOwnMetadata(
    transformMetadataKey.TRANSFORM,
    target.prototype,
    transformMetadataKey.TRANSFORM,
  );

  neededTransformParams?.forEach((param) => {
    const transforms: any[] = Reflect.getOwnMetadata(transformMetadataKey.HANDLER, target.prototype, param);
    transforms.forEach((handler) => {
      const transformedData = handler(inputData[param]);
      inputData[param] = transformedData;
    });
  });
};

export { validateSchema };
