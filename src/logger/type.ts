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

interface CustomLogger {
  debug(message: string): Logger;
  info(message: string): Logger;
  error(message: string): Logger;
  setContext(className: string, methodName?: string): void;
}

export { ServiceInfo, LoggerConfig, reflectMetadataKey, CustomLogger };
