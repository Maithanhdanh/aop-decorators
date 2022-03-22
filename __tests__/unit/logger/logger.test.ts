import { LoggerImpl } from '@logger/logger';

describe('LoggerImpl', () => {
  const logger = new LoggerImpl();

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
