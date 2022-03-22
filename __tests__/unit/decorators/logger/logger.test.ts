import { logContext, logInputParams } from '@decorators/logger/logger';
import { LoggerImpl } from '@logger/logger';
import { ILogger } from '@server/logger';

jest.spyOn(LoggerImpl.prototype, 'setContext');
jest.spyOn(LoggerImpl.prototype, 'debug');

@logContext()
class SampleClass {
  public logger: ILogger = new LoggerImpl();

  @logInputParams()
  public sampleMethod(_params: any): any {
    this.logger.info('bla bla');
  }
}

describe('decorators - logger', () => {
  it('should log param with caller context when apply logger decorators', () => {
    const sampleClass = new SampleClass();
    sampleClass.sampleMethod('test class decorator');
    expect(sampleClass.logger.setContext).toBeCalledWith('SampleClass', 'sampleMethod');
    expect(sampleClass.logger.debug).toBeCalledWith('method is called with params', ['test class decorator']);
  });
});
