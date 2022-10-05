import { IsString, validateSchema, Transform, IsRequired, IsMatched, Mapping } from '@server/decorators';
import { NameValidator } from '@server/decorators/validator/type';

describe('validator flow', () => {
  class RequestHeader {
    @IsString()
    @IsRequired('Missing authorization token')
    @IsMatched(/^Bearer/, 'token must be start with Bearer')
    @Transform((token) => token.replace('Bearer ', ''))
    @Mapping('jwt')
    private authentication!: string;

    @IsString()
    @IsRequired()
    @Mapping('amznId')
    private 'x-amzn-trace-id'!: string;

    public getData(): void {
      console.log(this.authentication);
      console.log(this['x-amzn-trace-id']);
    }
  }

  const buildData = (authentication: any, traceId: any) => ({
    authentication,
    'x-amzn-trace-id': traceId,
  });

  it.each`
    case                                       | authentication     | traceId      | issueField           | validatorName                | expectedResult
    ${'authentication is not string'}          | ${123}             | ${'123'}     | ${'authentication'}  | ${NameValidator.IS_STRING}   | ${'authentication must be string'}
    ${'authentication missing'}                | ${undefined}       | ${'123'}     | ${'authentication'}  | ${NameValidator.IS_REQUIRED} | ${'Missing authorization token'}
    ${'authentication must start with Bearer'} | ${'sample'}        | ${'123'}     | ${'authentication'}  | ${NameValidator.IS_MATCHED}  | ${'token must be start with Bearer'}
    ${'x-amzn-trace-id missing'}               | ${'Bearer sample'} | ${undefined} | ${'x-amzn-trace-id'} | ${NameValidator.IS_REQUIRED} | ${'x-amzn-trace-id must not be null'}
    ${'x-amzn-trace-id is not string'}         | ${'Bearer sample'} | ${123}       | ${'x-amzn-trace-id'} | ${NameValidator.IS_STRING}   | ${'x-amzn-trace-id must be string'}
  `(
    'should throw error $expectedResult when $case',
    ({ authentication, traceId, issueField, validatorName, expectedResult }) => {
      const data = buildData(authentication, traceId);

      try {
        validateSchema(RequestHeader, data);
      } catch (err) {
        expect(err).toEqual({
          message: expectedResult,
          name: validatorName,
          path: issueField,
        });
      }
    },
  );

  it('should return correctly after transforming and mapping data', () => {
    const data = buildData('Bearer sample', '123');

    validateSchema(RequestHeader, data);

    expect((data as any).jwt).toBe('sample');
    expect((data as any).amznId).toBe('123');
  });
});
