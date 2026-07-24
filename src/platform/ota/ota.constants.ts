export enum OTAStatus {
  IDLE = 'IDLE',
  CHECKING = 'CHECKING',
  AVAILABLE = 'AVAILABLE',
  DOWNLOADING = 'DOWNLOADING',
  INSTALLING = 'INSTALLING',
  UPDATED = 'UPDATED',
  UP_TO_DATE = 'UP_TO_DATE',
  FAILED = 'FAILED',
}

export interface OTAUpdate {
  version: string;
  mandatory: boolean;
  description?: string;
}