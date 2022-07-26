import { IsString, validateSchema, Transform, MaxStringSize } from '@server/decorators';

describe('validator flow', () => {
  class SampleClass {
    @IsString()
    @Transform((x) => x.concat(' transformed'))
    @MaxStringSize(5)
    private sampleProperty!: boolean;

    public getData(): void {
      console.log(this.sampleProperty);
    }
  }

  it(`should throw error when validate MaxStringSize after transforming data`, () => {
    const data = { sampleProperty: '123' };
    try {
      validateSchema(SampleClass, data);
    } catch (err) {
      expect(err).toEqual({
        message: 'sampleProperty size must be less than 5',
        name: 'MAX_SIZE',
        path: 'sampleProperty',
      });
    }

    expect(data.sampleProperty).toEqual('123 transformed');
  });
});
