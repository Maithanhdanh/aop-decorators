import { IsRequired, validateSchema } from '@server/decorators';

describe('IsRequired', () => {
  class SampleClass {
    @IsRequired()
    private sampleProperty: string;

    public getData(): void {
      console.log(this.sampleProperty);
    }
  }

  it(`should not throw error when valid data`, () => {
    validateSchema(SampleClass, { sampleProperty: 'string' });
  });

  it(`should throw error when invalid data`, () => {
    try {
      validateSchema(SampleClass, { property: 'string' });
    } catch (err) {
      expect(err).toEqual({ message: 'sampleProperty must not be null', name: 'IS_REQUIRED', path: 'sampleProperty' });
    }
  });
});
