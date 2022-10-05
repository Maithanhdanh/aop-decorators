import { ParamType } from './common/type';

const requiredMetadataKey = {
  REQUIRED: Symbol('required'),
  ERROR: Symbol('error'),
};

const validationMetadataKey = {
  VALIDATOR: 'validator',
  PARAMS: 'params',
};

enum NameValidator {
  //Custom test
  CUSTOM_TEST = 'CUSTOM_TEST',

  //Array
  IS_VALID_ARRAY = 'IS_VALID_ARRAY',
  SIZE = 'SIZE',

  //Object
  IS_VALID_OBJECT = 'IS_VALID_OBJECT',

  //String
  IS_STRING = 'IS_STRING',
  IS_REQUIRED = 'IS_REQUIRED',
  IS_MATCHED = 'IS_MATCHED',
  IS_EMAIL = 'IS_EMAIL',
  MAX_SIZE = 'MAX_SIZE',
  MIN_SIZE = 'MIN_SIZE',

  //Number
  IS_LARGER = 'IS_LARGER',
  IS_LESS = 'IS_LESS',
  IS_NUMBER = 'IS_NUMBER',
  MAX_DIGITS = 'MAX_DIGITS',
  MIN_DIGITS = 'MIN_DIGITS',

  //Boolean
  IS_BOOLEAN = 'IS_BOOLEAN',
}

interface ValidationError {
  name: NameValidator | string;
  message: string;
  path: string;
}

const messageMapper = {
  //Custom Test
  [NameValidator.CUSTOM_TEST]: 'custom test failed',

  //Array
  [NameValidator.IS_VALID_ARRAY]: 'must be a valid array element',
  [NameValidator.SIZE]: 'size must be',

  //Object
  [NameValidator.IS_VALID_OBJECT]: 'must be a valid object',

  //Number
  [NameValidator.IS_LARGER]: 'must be larger than',
  [NameValidator.IS_LESS]: 'must be less than',
  [NameValidator.IS_NUMBER]: 'must be number',
  [NameValidator.MAX_DIGITS]: 'digits must be less than',
  [NameValidator.MIN_DIGITS]: 'digits must be greater than',

  //String
  [NameValidator.IS_STRING]: 'must be string',
  [NameValidator.IS_REQUIRED]: 'must not be null',
  [NameValidator.IS_MATCHED]: 'must match',
  [NameValidator.IS_EMAIL]: 'must be email',
  [NameValidator.MAX_SIZE]: 'size must be less than',
  [NameValidator.MIN_SIZE]: 'size must be greater than',

  //Boolean
  [NameValidator.IS_BOOLEAN]: 'must be boolean',
};

interface BaseValidatorDecorator {
  getType: ParamType;
}

interface Validator extends BaseValidatorDecorator {
  validateData(value: unknown | string): boolean;
  setErrorHandler: <T extends Error>(path: string, errorHandler?: T | string) => void;
  process(value: unknown, path: string): void;
}

interface Transformer extends BaseValidatorDecorator {
  process(value: unknown): void;
}

interface Mappinger extends BaseValidatorDecorator {
  process(data: unknown, fieldName: string): void;
}

export {
  requiredMetadataKey,
  NameValidator,
  ValidationError,
  messageMapper,
  Validator,
  validationMetadataKey,
  BaseValidatorDecorator,
  Transformer,
  Mappinger,
};
