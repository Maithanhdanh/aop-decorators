import { messageMapper, NameValidator, ValidationError } from '../type';

const validationErrorBuilder = (name: NameValidator, path: string): ValidationError => {
  return {
    name,
    message: `${path} ${messageMapper[name]}`,
    path,
  };
};

export { NameValidator, validationErrorBuilder };
