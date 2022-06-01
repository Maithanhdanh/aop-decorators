import { addNeededTransformParams, addTransformHandlerParams } from '../../utils/metadata';

function Transform(handler: (...args: any) => any) {
  return function (target: any, propertyKey: string): any {
    addNeededTransformParams(target, propertyKey);

    addTransformHandlerParams(target, propertyKey, handler);
  };
}

export { Transform };
