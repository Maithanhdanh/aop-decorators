import { requiredMetadataKey } from '@decorators/validator/type';
import 'reflect-metadata';

function validate(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const requiredParams: number[] = Reflect.getOwnMetadata(requiredMetadataKey.REQUIRED, target, propertyName);
    const error = Reflect.getOwnMetadata(requiredMetadataKey.ERROR, target, propertyName);

    requiredParams.forEach((paramIndex) => {
      if (paramIndex >= args.length || !args[paramIndex]) {
        if (error && error instanceof Error) {
          throw error;
        }
      }
    });

    return originalMethod.apply(this, args);
  };
}

export { validate };
