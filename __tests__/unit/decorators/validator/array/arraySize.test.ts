import { IsRequired, IsString, ArraySize, validateSchema } from '@server/decorators';

describe('ArraySize', () => {
  class ChildClass {
    @IsString()
    private id: string;

    @IsRequired()
    private date: string;

    public getData(): void {
      console.log(this.date, this.id);
    }
  }

  it(`should throw error when there is no boundary in validator`, () => {
    class SampleClass {
      @ArraySize({})
      private sampleProperty: ChildClass[];

      public getData(): void {
        console.log(this.sampleProperty);
      }
    }

    try {
      validateSchema(SampleClass, { sampleProperty: [] });
    } catch (err) {
      expect(err).toEqual({
        message: 'sampleProperty size validator has no boundary',
        name: 'SIZE',
        path: 'sampleProperty',
      });
    }
  });

  it(`should throw error when max < min`, () => {
    class SampleClass {
      @ArraySize({ max: 1, min: 2 })
      private sampleProperty: ChildClass[];

      public getData(): void {
        console.log(this.sampleProperty);
      }
    }

    try {
      validateSchema(SampleClass, { sampleProperty: [] });
    } catch (err) {
      expect(err).toEqual({
        message: 'sampleProperty size validator has max boundary less than min boundary',
        name: 'SIZE',
        path: 'sampleProperty',
      });
    }
  });

  describe('max', () => {
    class SampleClass {
      @ArraySize({ max: 1 })
      private sampleProperty: ChildClass[];

      public getData(): void {
        console.log(this.sampleProperty);
      }
    }

    it(`should not throw error when data is empty`, () => {
      validateSchema(SampleClass, { sampleProperty: [] });
    });

    it(`should not throw error when number of element equal 1`, () => {
      try {
        validateSchema(SampleClass, { sampleProperty: [{ date: 'string' }] });
      } catch (err) {
        expect(err).toEqual({
          message: 'sampleProperty size must be less than 3',
          name: 'SIZE',
          path: 'sampleProperty',
        });
      }
    });

    it(`should throw error when number of element less than 1`, () => {
      try {
        validateSchema(SampleClass, { sampleProperty: [{ date: 'string' }, { date: 'string' }] });
      } catch (err) {
        expect(err).toEqual({
          message: 'sampleProperty size must be less than 1',
          name: 'SIZE',
          path: 'sampleProperty',
        });
      }
    });
  });

  describe('min', () => {
    class SampleClass {
      @ArraySize({ min: 2 })
      private sampleProperty: ChildClass[];

      public getData(): void {
        console.log(this.sampleProperty);
      }
    }

    it(`should not throw error when number of element equal 2`, () => {
      validateSchema(SampleClass, { sampleProperty: [{ date: 'string' }, { date: 'string' }] });
    });

    it(`should throw error when number of element greater than 2`, () => {
      try {
        validateSchema(SampleClass, { sampleProperty: [{ date: 'string' }] });
      } catch (err) {
        expect(err).toEqual({
          message: 'sampleProperty size must be greater than 2',
          name: 'SIZE',
          path: 'sampleProperty',
        });
      }
    });
  });

  describe('max & min', () => {
    class SampleClass {
      @ArraySize({ max: 4, min: 2 })
      private sampleProperty: ChildClass[];

      public getData(): void {
        console.log(this.sampleProperty);
      }
    }

    it(`should not throw error when number of element equal 2`, () => {
      validateSchema(SampleClass, { sampleProperty: [{ date: 'string' }, { date: 'string' }] });
    });

    it(`should throw error when number of element greater than 2`, () => {
      try {
        validateSchema(SampleClass, { sampleProperty: [{ date: 'string' }] });
      } catch (err) {
        expect(err).toEqual({
          message: 'sampleProperty size must be less than 4, greater than 2',
          name: 'SIZE',
          path: 'sampleProperty',
        });
      }
    });
  });
});
