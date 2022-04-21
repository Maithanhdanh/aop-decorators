import { MaxDigits, validateSchema } from '@server/decorators';

describe('IsLess', () => {
  class SampleClass {
    @MaxDigits(3)
    private sampleProperty: number;

    public getData(): void {
      console.log(this.sampleProperty);
    }
  }
  it(`should not throw error when data is string`, () => {
    validateSchema(SampleClass, { sampleProperty: 123 });
  });

  it(`should not throw error when data is not defined`, () => {
    validateSchema(SampleClass, { property: 'sample' });
  });

  it(`should throw error when data is not string`, () => {
    try {
      validateSchema(SampleClass, { sampleProperty: 12 });
    } catch (err) {
      expect(err).toEqual({
        message: 'sampleProperty digits must be less than 3',
        name: 'MAX_DIGITS',
        path: 'sampleProperty',
      });
    }
  });
});
