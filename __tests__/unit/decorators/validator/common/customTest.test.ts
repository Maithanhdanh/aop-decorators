import { Test, validateSchema } from '@server/decorators';

describe('CustomTest', () => {
  const canConvertStringToNum = (value: string): boolean => {
    return !!parseInt(value);
  };

  class SampleClass {
    @Test(canConvertStringToNum)
    private sampleProperty: string;

    public getData(): void {
      console.log(this.sampleProperty);
    }
  }

  it(`should not throw error when valid data`, () => {
    validateSchema(SampleClass, { sampleProperty: '123' });
  });

  it(`should throw error when invalid data`, () => {
    try {
      validateSchema(SampleClass, { property: 'string' });
    } catch (err) {
      expect(err).toEqual({ message: 'sampleProperty custom test failed', name: 'canConvertStringToNum', path: 'sampleProperty' });
    }
  });
});
