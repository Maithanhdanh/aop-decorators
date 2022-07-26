import { validationMetadataKey, Validator } from '../type';
import { ParamType } from './type';
import { Transformer } from '../transform/type';

const validateSchema = (target: any, inputData: any) => {
  const neededValidateParams: string[] = Reflect.getOwnMetadata(
    validationMetadataKey.PARAMS,
    target.prototype,
    validationMetadataKey.PARAMS,
  );

  neededValidateParams?.forEach((param) => {
    const validators: Validator[] | Transformer[] = Reflect.getOwnMetadata(
      validationMetadataKey.VALIDATOR,
      target.prototype,
      param,
    );

    validators?.forEach((validator: Validator | Transformer) => {
      if (validator.getType === ParamType.VALIDATOR) {
        (validator as Validator).process(inputData[param], param);
      }

      if (validator.getType === ParamType.TRANSFORMER) {
        const transformedData = (validator as Transformer).process(inputData[param]);
        inputData[param] = transformedData;
      }
    });
  });
};

export { validateSchema };
