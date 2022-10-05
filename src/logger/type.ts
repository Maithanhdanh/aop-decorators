import { Logger } from 'winston';

interface ServiceInfo {
  serviceName: string;
  serviceId?: string;
  serviceVersion?: string;
}

type Sensitivity = 'Masked' | 'Unmasked';

interface LoggerConfig {
  logLevel: string;
  serviceInfo?: ServiceInfo;
  sensitivity?: Sensitivity;
}

const reflectMetadataKey = {
  CLASS_NAME: Symbol('className'),
  METHOD_NAME: Symbol('methodName'),
};

interface ILogger {
  debug(message: string): Logger;
  debug(message: string, ...args: any[]): Logger;

  info(message: string): Logger;
  info(message: string, ...args: any[]): Logger;

  error(message: string): Logger;
  error(message: string, ...args: any[]): Logger;

  warn(message: string): Logger;
  warn(message: string, ...args: any[]): Logger;

  http(message: string): Logger;
  http(message: string, ...args: any[]): Logger;

  verbose(message: string): Logger;
  verbose(message: string, ...args: any[]): Logger;

  silly(message: string): Logger;
  silly(message: string, ...args: any[]): Logger;

  setContext(className: string, methodName?: string): void;
}

export { ServiceInfo, LoggerConfig, reflectMetadataKey, ILogger };
