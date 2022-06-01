import { Transform, validateSchema } from '@server/decorators';

describe('Transform', () => {
  class SampleClass {
    @Transform((x) => x.concat(' transformed'))
    private sampleProperty: string;

    public getData(): void {
      console.log(this.sampleProperty);
    }
  }

  it(`should return transformed string`, () => {
    const sampleData = { sampleProperty: 'string' };
    validateSchema(SampleClass, sampleData);
    expect(sampleData.sampleProperty).toBe('string transformed');
  });
});
