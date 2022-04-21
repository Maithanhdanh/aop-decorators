import { IsNumber, validateSchema } from '@server/decorators';

describe('IsLess', () => {
  class SampleClass {
    @IsNumber()
    private sampleProperty: number;

    public getData(): void {
      console.log(this.sampleProperty);
    }
  }
  it(`should not throw error when data is string`, () => {
    validateSchema(SampleClass, { sampleProperty: 2 });
  });

  it(`should not throw error when data is not defined`, () => {
    validateSchema(SampleClass, { property: 'sample' });
  });

  it(`should throw error when data is not string`, () => {
    try {
      validateSchema(SampleClass, { sampleProperty: 'string' });
    } catch (err) {
      expect(err).toEqual({
        message: 'sampleProperty must be number',
        name: 'IS_NUMBER',
        path: 'sampleProperty',
      });
    }
  });
});
