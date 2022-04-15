const requiredMetadataKey = {
  REQUIRED: Symbol('required'),
  ERROR: Symbol('error'),
};

const validationMetadataKey = {
  VALIDATOR: 'validator',
  PARAMS: 'params',
};

enum NameValidator {
  IS_STRING = 'IS_STRING',
  IS_REQUIRED = 'IS_REQUIRED',
}

interface ValidationError {
  name: NameValidator;
  message: string;
  path: string;
}

const messageMapper = {
  [NameValidator.IS_STRING]: 'must be string',
  [NameValidator.IS_REQUIRED]: 'must not be null',
};

interface Validator {
  getName: string;
  validateData(value: unknown): boolean;
  setErrorHandler: <T extends Error>(path: string, errorHandler?: T | string) => void;
  executeErrorHandler(path: string): never;
}

export { requiredMetadataKey, NameValidator, ValidationError, messageMapper, Validator, validationMetadataKey };
