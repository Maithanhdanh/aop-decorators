import { CustomLogger } from '@logger/type';
import { Logger } from '@logger/logger';

class SampleClass {
  public logger: CustomLogger = new Logger();

  public sampleMethod(_params: any): any {
    this.logger.info('bla bla');
  }
}

export { SampleClass };
