import { addNeededValidateParams, addValidatorForParams } from '../../utils/metadata';
import { ParamType } from '../common/type';
import { Transformer } from './type';

class TransformData implements Transformer {
  private type = ParamType.TRANSFORMER;
  private handler;

  constructor(handler: (...args: any) => any) {
    this.handler = handler;
  }

  public get getType(): ParamType {
    return this.type;
  }

  public process(value: any): any {
    return this.handler(value);
  }
}

function Transform(handler: (...args: any) => any) {
  return function (target: any, propertyKey: string): any {
    addNeededValidateParams(target, propertyKey);

    addValidatorForParams(target, propertyKey, new TransformData(handler));
  };
}

export { Transform };
