import { IsRequired, IsString, IsValidObject, validateSchema } from '@server/decorators';

describe('IsValidObject', () => {
  class ChildClass {
    @IsString()
    private id: string;

    @IsRequired()
    private date: string;

    public getData(): void {
      console.log(this.date, this.id);
    }
  }

  class SampleClass {
    @IsValidObject()
    private sampleProperty: ChildClass;

    public getData(): void {
      console.log(this.sampleProperty);
    }
  }
  
  it(`should not throw error when valid data`, () => {
    validateSchema(SampleClass, { sampleProperty: { id: 'string', date: 'string' } });
  });

  it(`should throw error when id is number`, () => {
    try {
      validateSchema(SampleClass, { sampleProperty: { id: 123, date: 'string' } });
    } catch (err) {
      expect(err).toEqual({
        message: 'id must be string',
        name: 'IS_VALID_OBJECT',
        path: 'sampleProperty.id',
      });
    }
  });

  it(`should not throw error when missing id`, () => {
    validateSchema(SampleClass, { sampleProperty: { date: 'string' } });
  });

  it(`should throw error when missing date`, () => {
    try {
      validateSchema(SampleClass, { sampleProperty: { id: '123' } });
    } catch (err) {
      expect(err).toEqual({
        message: 'date must not be null',
        name: 'IS_VALID_OBJECT',
        path: 'sampleProperty.date',
      });
    }
  });
});
