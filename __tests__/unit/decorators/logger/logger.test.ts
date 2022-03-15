import { logContext, logInputParams } from '@decorators/logger/logger';
import { Logger } from '@logger/logger';
import { SampleClass } from '@tests/fixtures/class';

jest.spyOn(Logger.prototype, 'setContext');
jest.spyOn(Logger.prototype, 'debug');

describe('decorators - logger', () => {
  it('should log param with caller context when apply logger decorators', () => {
    logInputParams()(
      SampleClass,
      'sampleMethod',
      Object.getOwnPropertyDescriptor(SampleClass.prototype, 'sampleMethod'),
    );
    logContext()(SampleClass);

    const sampleClass = new SampleClass();
    sampleClass.sampleMethod('test class decorator');
    expect(sampleClass.logger.setContext).toBeCalledWith('SampleClass', 'sampleMethod');
    expect(sampleClass.logger.debug).toBeCalledWith('method is called with params', ['test class decorator']);
  });
});
