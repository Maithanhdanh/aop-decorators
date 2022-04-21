import 'reflect-metadata';
import { requiredMetadataKey } from './type';

function required<T extends Error>(expectedReturn?: T | boolean) {
  return function (target: unknown, propertyKey: string | symbol, parameterIndex: number): void {
    const requiredParams: number[] = Reflect.getOwnMetadata(requiredMetadataKey.REQUIRED, target, propertyKey) || [];
    requiredParams.push(parameterIndex);

    Reflect.defineMetadata(requiredMetadataKey.REQUIRED, requiredParams, target, propertyKey);
    expectedReturn && Reflect.defineMetadata(requiredMetadataKey.ERROR, expectedReturn, target, propertyKey);
  };
}

export { required };
