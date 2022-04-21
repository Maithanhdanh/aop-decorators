import { IsString, validateSchema } from '@server/decorators';

describe('IsString', () => {
  class SampleClass {
    @IsString()
    private sampleProperty: string;

    public getData(): void {
      console.log(this.sampleProperty);
    }
  }
  it(`should not throw error when data is string`, () => {
    validateSchema(SampleClass, { sampleProperty: 'sample' });
  });

  it(`should not throw error when data is not defined`, () => {
    validateSchema(SampleClass, { property: 'sample' });
  });

  it(`should throw error when data is not string`, () => {
    try {
      validateSchema(SampleClass, { sampleProperty: 123 });
    } catch (err) {
      expect(err).toEqual({
        message: 'sampleProperty must be string',
        name: 'IS_STRING',
        path: 'sampleProperty',
      });
    }
  });
});
