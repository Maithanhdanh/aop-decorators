import { loggerConfig } from '@logger/logger.config';
import { ILogger, LoggerConfig } from '@logger/type';
import { injectable } from 'inversify';
import winston, { Logger } from 'winston';

const { createLogger, transports, format } = winston;
const { timestamp, json, errors, combine } = format;

const metadataFormat = ({ serviceInfo }: LoggerConfig) =>
  format((info) => {
    if (serviceInfo) {
      info.serviceName = serviceInfo.serviceName;
      info.serviceId = serviceInfo.serviceId;
      info.serviceVersion = serviceInfo.serviceVersion;
    }

    return info;
  });

const customFormat = (loggerConfig: LoggerConfig) =>
  combine(errors({ stack: true }), metadataFormat(loggerConfig)(), timestamp(), json());

const loggerWrapper = (config: LoggerConfig): Logger =>
  createLogger({
    format: customFormat(config),
    level: config.logLevel,
    transports: [new transports.Console()],
    exitOnError: false,
  });

@injectable()
class LoggerImpl implements ILogger {
  private className: string;
  private methodName: string;
  public logger: Logger;

  constructor(config: LoggerConfig = loggerConfig) {
    this.logger = loggerWrapper(config);
  }

  public debug(message: string, ...args: any[]): Logger {
    return this.logger.debug(this.buildMessage(message), ...args);
  }

  public info(message: string, ...args: any[]): Logger {
    return this.logger.info(this.buildMessage(message), ...args);
  }

  public error(message: string, ...args: any[]): Logger {
    return this.logger.error(this.buildMessage(message), ...args);
  }

  public setContext(className: string, methodName?: string): void {
    this.className = `[${className}] `;
    this.methodName = methodName ? `[${methodName}] ` : '';
  }

  public get getMethodName(): string {
    return this.methodName;
  }

  public get getClassName(): string {
    return this.className;
  }

  private buildMessage(message: string): string {
    return this.className + this.methodName + message;
  }
}

export { LoggerImpl, loggerWrapper };
