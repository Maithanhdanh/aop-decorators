import { validationMetadataKey, Validator } from '../type';

const validateSchema = (target: any, inputData: any) => {
  const neededValidateParams: string[] = Reflect.getOwnMetadata(
    validationMetadataKey.PARAMS,
    target.prototype,
    validationMetadataKey.PARAMS,
  );

  for (const param of neededValidateParams) {
    const validators: Validator[] = Reflect.getOwnMetadata(validationMetadataKey.VALIDATOR, target.prototype, param);
    validators.forEach((validator) => validator.validate(inputData[param], param));
  }
};

export { validateSchema };
