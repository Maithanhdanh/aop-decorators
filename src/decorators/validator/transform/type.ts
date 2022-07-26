import { BaseValidatorDecorator } from '../type';

const transformMetadataKey = {
  TRANSFORM: 'transform',
  HANDLER: 'handler',
};

interface Transformer extends BaseValidatorDecorator {
  process(value: unknown): void;
}

export { transformMetadataKey, Transformer };
