function logContext() {
  return (target: any) => {
    for (const propertyName of Object.getOwnPropertyNames(target.prototype)) {
      const descriptor = Object.getOwnPropertyDescriptor(target.prototype, propertyName);
      const originalMethod = descriptor.value;

      descriptor.value = function (...args: any[]) {
        (this as any).logger.setContext(target.name, propertyName);
        return originalMethod.apply(this, args);
      };

      Object.defineProperty(target.prototype, propertyName, descriptor);
    }
  };
}

function logInputParams() {
  return (_target: any, _propertyKey: string, descriptor: PropertyDescriptor): void => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      (this as any).logger.debug('method is called with params', args);
      return originalMethod.apply(this, args);
    };
  };
}

export { logContext, logInputParams };
