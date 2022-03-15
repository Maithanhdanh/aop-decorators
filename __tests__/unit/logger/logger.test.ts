import { Logger } from '@logger/logger';

describe('Logger', () => {
  const logger = new Logger();

  it('should update className and methodName when call setContext', () => {
    logger.setContext('className', 'methodName');
    expect(logger.getClassName).toBe('[className] ');
    expect(logger.getMethodName).toBe('[methodName] ');
  });

  it('should update className when call setContext without methodName', () => {
    logger.setContext('className');
    expect(logger.getClassName).toBe('[className] ');
    expect(logger.getMethodName).toBe('');
  });
});
