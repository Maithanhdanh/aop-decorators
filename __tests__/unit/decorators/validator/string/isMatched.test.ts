import { IsMatched, validateSchema } from '@server/decorators';

describe('IsMatched', () => {
  const pattern = /^dog/;

  class SampleClass {
    @IsMatched(pattern)
    private sampleProperty: string;

    public getData(): void {
      console.log(this.sampleProperty);
    }
  }
  it(`should not throw error when data follow pattern`, () => {
    validateSchema(SampleClass, { sampleProperty: 'dog' });
  });

  it(`should throw error when data does not follow pattern`, () => {
    try {
      validateSchema(SampleClass, { sampleProperty: 'sadsada' });
    } catch (err) {
      expect(err).toEqual({
        message: 'sampleProperty must match /^dog/',
        name: 'IS_MATCHED',
        path: 'sampleProperty',
      });
    }
  });
});
