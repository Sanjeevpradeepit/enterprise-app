import { LogLevel, LogMeta } from './types';

class ConsoleTransport {
  log(
    level: LogLevel,
    message: string,
    meta?: LogMeta,
  ) {
    const prefix = `[${level}]`;

    switch (level) {
      case 'DEBUG':
        console.debug(prefix, message, meta ?? '');
        break;

      case 'INFO':
        console.info(prefix, message, meta ?? '');
        break;

      case 'WARN':
        console.warn(prefix, message, meta ?? '');
        break;

      case 'ERROR':
        console.error(prefix, message, meta ?? '');
        break;
    }
  }
}

export const consoleTransport =
  new ConsoleTransport();