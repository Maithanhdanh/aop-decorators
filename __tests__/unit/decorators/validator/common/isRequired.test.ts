import { IsRequired, validateSchema } from '@server/decorators';

describe('IsRequired', () => {
  class SampleClass {
    @IsRequired('missing field')
    private sampleProperty: string;

    public getData(): void {
      console.log(this.sampleProperty);
    }
  }

  it(`should not throw error when valid data`, () => {
    validateSchema(SampleClass, { sampleProperty: 'string' });
  });

  it(`should throw error with input message when invalid data`, () => {
    try {
      validateSchema(SampleClass, { property: 'string' });
    } catch (err) {
      expect(err).toEqual({ message: 'missing field', name: 'IS_REQUIRED', path: 'sampleProperty' });
    }
  });
});
