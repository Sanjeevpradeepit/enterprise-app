export type LogLevel =
  | 'DEBUG'
  | 'INFO'
  | 'WARN'
  | 'ERROR';

export interface LogMeta {
  [key: string]: unknown;
}