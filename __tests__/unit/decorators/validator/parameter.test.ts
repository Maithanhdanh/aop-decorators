import { requiredMetadataKey } from '@decorators/validator/type';
import { required } from '@decorators/validator/parameter';

describe('parameter', () => {
  describe('required', () => {
    it.each`
      error
      ${undefined}
      ${new Error('missing required parameter')}
    `(`should store param name as required with error=$error callback`, ({ error }) => {
      class SampleClass {
        public sampleMethod(@required(error) _param: string): any {}
      }

      const requiredParam = Reflect.getOwnMetadata(requiredMetadataKey.REQUIRED, SampleClass.prototype, 'sampleMethod');
      const errorHandler = Reflect.getOwnMetadata(requiredMetadataKey.ERROR, SampleClass.prototype, 'sampleMethod');
      expect(requiredParam[0]).toBe(0);
      expect(errorHandler).toBe(error);
    });
  });
});
