import { Mapping, validateSchema } from '@server/decorators';

interface RenamedData {
  renamedField: string;
}

describe('Transform', () => {
  class SampleClass {
    @Mapping('renamedField')
    private sampleProperty: string;

    private somethingElse: string;

    public getData(): void {
      console.log(this.sampleProperty);
      console.log(this.somethingElse);
    }
  }

  it(`should return transformed string`, () => {
    const sampleData = { sampleProperty: 'string', somethingElse: 'somethingElse' };
    validateSchema(SampleClass, sampleData);
    expect(sampleData.sampleProperty).toBeUndefined();
    expect((sampleData as unknown as RenamedData).renamedField).toBe('string');
    expect(sampleData.somethingElse).toBe('somethingElse');
  });
});
