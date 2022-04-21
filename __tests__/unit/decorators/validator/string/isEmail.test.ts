import { IsEmail, validateSchema } from '@server/decorators';

describe('IsEmail', () => {
  class SampleClass {
    @IsEmail()
    private sampleProperty: string;

    public getData(): void {
      console.log(this.sampleProperty);
    }
  }

  it(`should not throw error when data is email`, () => {
    validateSchema(SampleClass, { sampleProperty: 'blabla@gmail.com' });
  });

  it(`should throw error when data is not email`, () => {
    try {
      validateSchema(SampleClass, { sampleProperty: 'string' });
    } catch (err) {
      expect(err).toEqual({
        message: 'sampleProperty must be email',
        name: 'IS_EMAIL',
        path: 'sampleProperty',
      });
    }
  });
});
