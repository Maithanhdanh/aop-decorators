import { IsRequired, IsString, IsValidArray, validateSchema } from '@server/decorators';

describe('IsValidArray', () => {
  describe('child class is object', () => {
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
      @IsValidArray(ChildClass)
      private sampleProperty: ChildClass[];

      public getData(): void {
        console.log(this.sampleProperty);
      }
    }

    it(`should not throw error when valid data`, () => {
      validateSchema(SampleClass, { sampleProperty: [{ id: 'string', date: 'string' }] });
    });

    it(`should throw error when id is number`, () => {
      try {
        validateSchema(SampleClass, { sampleProperty: [{ id: 123, date: 'string' }] });
      } catch (err) {
        expect(err).toEqual({
          message: 'id must be string',
          name: 'IS_VALID_ARRAY',
          path: 'sampleProperty[0].id',
        });
      }
    });

    it(`should not throw error when missing id`, () => {
      validateSchema(SampleClass, { sampleProperty: [{ date: 'string' }] });
    });

    it(`should throw error when missing date`, () => {
      try {
        validateSchema(SampleClass, { sampleProperty: [{ id: '123' }] });
      } catch (err) {
        expect(err).toEqual({
          message: 'date must not be null',
          name: 'IS_VALID_ARRAY',
          path: 'sampleProperty[0].date',
        });
      }
    });
  });

  describe('child class is string', () => {
    class SampleClass {
      @IsValidArray(String)
      private sampleProperty: string[];

      public getData(): void {
        console.log(this.sampleProperty);
      }
    }

    it(`should not throw error when valid data`, () => {
      validateSchema(SampleClass, { sampleProperty: ['string'] });
    });

    it(`should throw error when id is number`, () => {
      try {
        validateSchema(SampleClass, { sampleProperty: [123] });
      } catch (err) {
        expect(err).toEqual({
          message: 'must be a valid array element',
          name: 'IS_VALID_ARRAY',
          path: 'sampleProperty[0]',
        });
      }
    });

    it(`should throw error when missing date`, () => {
      try {
        validateSchema(SampleClass, { sampleProperty: ['string', 'string', 123] });
      } catch (err) {
        expect(err).toEqual({
          message: 'must be a valid array element',
          name: 'IS_VALID_ARRAY',
          path: 'sampleProperty[2]',
        });
      }
    });
  });

  describe('child class is boolean', () => {
    class SampleClass {
      @IsValidArray(Boolean)
      private sampleProperty: Boolean[];

      public getData(): void {
        console.log(this.sampleProperty);
      }
    }

    it(`should not throw error when valid data`, () => {
      validateSchema(SampleClass, { sampleProperty: [true] });
    });

    it(`should throw error when id is number`, () => {
      try {
        validateSchema(SampleClass, { sampleProperty: [123] });
      } catch (err) {
        expect(err).toEqual({
          message: 'must be a valid array element',
          name: 'IS_VALID_ARRAY',
          path: 'sampleProperty[0]',
        });
      }
    });
  });
});
