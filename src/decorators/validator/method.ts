import { requiredMetadataKey } from './type';
import 'reflect-metadata';

function validate(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const requiredParams: number[] = Reflect.getOwnMetadata(requiredMetadataKey.REQUIRED, target, propertyName);
    const expectedReturn = Reflect.getOwnMetadata(requiredMetadataKey.ERROR, target, propertyName);

    for (const paramIndex of requiredParams) {
      if (paramIndex >= args.length || !args[paramIndex]) {
        if (expectedReturn && expectedReturn instanceof Error) {
          throw expectedReturn;
        }

        if (expectedReturn && typeof expectedReturn === 'boolean') {
          return expectedReturn;
        }
      }
    }
    return originalMethod.apply(this, args);
  };
}

export { validate };
