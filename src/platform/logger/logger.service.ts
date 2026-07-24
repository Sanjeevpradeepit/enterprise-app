import { LOG_PREFIX } from './constants';
import { consoleTransport } from './transports';
import type {
  LogLevel,
  LogMeta,
} from './types';

class LoggerService {
  private enabled = __DEV__;

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  private write(
    level: LogLevel,
    message: string,
    meta?: LogMeta,
  ) {
    if (!this.enabled) {
      return;
    }

    consoleTransport.log(
      level,
      `${LOG_PREFIX} ${message}`,
      meta,
    );
  }

  debug(
    message: string,
    meta?: LogMeta,
  ) {
    this.write(
      'DEBUG',
      message,
      meta,
    );
  }

  info(
    message: string,
    meta?: LogMeta,
  ) {
    this.write(
      'INFO',
      message,
      meta,
    );
  }

  warn(
    message: string,
    meta?: LogMeta,
  ) {
    this.write(
      'WARN',
      message,
      meta,
    );
  }

  error(
    message: string,
    error?: unknown,
  ) {
    this.write('ERROR', message, {
      error,
    });
  }
}

export const logger =
  new LoggerService();