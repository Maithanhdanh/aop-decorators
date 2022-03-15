import { validate } from '@decorators/validator/method';
import { required } from '@decorators/validator/parameter';

describe('method', () => {
  it('should not throw error when undefined input argument', () => {
    class SampleClass {
      @validate
      public sampleMethod(@required() _param: string): void {
        console.log('dummy step');
      }
    }

    const sampleClass = new SampleClass();
    sampleClass.sampleMethod(undefined);
  });

  it('should throw error when undefined input argument', () => {
    const error = new Error('input argument must be defined');
    class SampleClass {
      @validate
      public sampleMethod(@required(error) _param: string): void {}
    }

    const sampleClass = new SampleClass();
    try {
      sampleClass.sampleMethod(undefined);
    } catch (err) {
      expect(err).toEqual(error);
    }
  });
});
