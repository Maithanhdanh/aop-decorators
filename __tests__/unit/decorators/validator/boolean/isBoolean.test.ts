import { IsBoolean, validateSchema } from '@server/decorators';

describe('IsBoolean', () => {
  class SampleClass {
    @IsBoolean()
    private sampleProperty: Boolean;

    public getData(): void {
      console.log(this.sampleProperty);
    }
  }
  it(`should not throw error when data is string`, () => {
    validateSchema(SampleClass, { sampleProperty: true });
  });

  it(`should not throw error when data is not defined`, () => {
    validateSchema(SampleClass, { property: 'true' });
  });

  it(`should throw error when data is not string`, () => {
    try {
      validateSchema(SampleClass, { sampleProperty: 'true' });
    } catch (err) {
      expect(err).toEqual({
        message: 'sampleProperty must be boolean',
        name: 'IS_BOOLEAN',
        path: 'sampleProperty',
      });
    }
  });
});
