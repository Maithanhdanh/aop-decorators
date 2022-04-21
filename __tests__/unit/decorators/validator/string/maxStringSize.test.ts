import { MaxStringSize, validateSchema } from '@server/decorators';

describe('MaxStringSize', () => {
  class SampleClass {
    @MaxStringSize(3)
    private sampleProperty: string;

    public getData(): void {
      console.log(this.sampleProperty);
    }
  }
  it(`should not throw error when data is string`, () => {
    validateSchema(SampleClass, { sampleProperty: '123' });
  });

  it(`should not throw error when data is not defined`, () => {
    validateSchema(SampleClass, { property: 'sample' });
  });

  it(`should throw error when data is not string`, () => {
    try {
      validateSchema(SampleClass, { sampleProperty: '1234' });
    } catch (err) {
      expect(err).toEqual({
        message: 'sampleProperty size must be less than 3',
        name: 'MAX_SIZE',
        path: 'sampleProperty',
      });
    }
  });
});
