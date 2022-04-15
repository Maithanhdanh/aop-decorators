import 'reflect-metadata';
import { requiredMetadataKey } from './type';

function required<T extends Error>(error?: T) {
  return function (target: any, propertyKey: string | symbol, parameterIndex: number): void {
    const requiredParams: number[] = Reflect.getOwnMetadata(requiredMetadataKey.REQUIRED, target, propertyKey) || [];
    requiredParams.push(parameterIndex);

    Reflect.defineMetadata(requiredMetadataKey.REQUIRED, requiredParams, target, propertyKey);
    error && Reflect.defineMetadata(requiredMetadataKey.ERROR, error, target, propertyKey);
  };
}

export { required };
