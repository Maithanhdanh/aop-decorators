import { LoggerImpl } from '@logger/logger';
import { ILogger } from '@logger/type';

class SampleClass {
  public logger: ILogger = new LoggerImpl();

  public sampleMethod(_params: any): any {
    this.logger.info('bla bla');
  }
}

export { SampleClass };
