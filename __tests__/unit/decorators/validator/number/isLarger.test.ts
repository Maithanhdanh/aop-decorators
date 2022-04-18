import { IsLarger, validateSchema } from '@server/decorators';

describe('IsLarger', () => {
  class SampleClass {
    @IsLarger(3)
    private sampleProperty: number;

    public getData(): void {
      console.log(this.sampleProperty);
    }
  }
  it(`should not throw error when data is string`, () => {
    validateSchema(SampleClass, { sampleProperty: 4 });
  });

  it(`should not throw error when data is not defined`, () => {
    validateSchema(SampleClass, { property: 'sample' });
  });

  it(`should throw error when data is not string`, () => {
    try {
      validateSchema(SampleClass, { sampleProperty: 2 });
    } catch (err) {
      expect(err).toEqual({
        message: 'sampleProperty must be larger than 3',
        name: 'IS_LARGER',
        path: 'sampleProperty',
      });
    }
  });
});
