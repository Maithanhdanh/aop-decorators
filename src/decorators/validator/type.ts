const requiredMetadataKey = {
  REQUIRED: Symbol('required'),
  ERROR: Symbol('error'),
};

const validationMetadataKey = {
  VALIDATOR: 'validator',
  PARAMS: 'params',
};

enum NameValidator {
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
}

interface ValidationError {
  name: NameValidator;
  message: string;
  path: string;
}

const messageMapper = {
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
};

interface Validator {
  getName: string;
  validateData(value: unknown | string): boolean;
  setErrorHandler: <T extends Error>(path: string, errorHandler?: T | string) => void;
  validate(value: unknown, path: string): void;
}

export { requiredMetadataKey, NameValidator, ValidationError, messageMapper, Validator, validationMetadataKey };
