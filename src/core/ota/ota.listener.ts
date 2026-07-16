import { OTAStatus } from './ota.constants';

export type OTAStatusListener = (
  status: OTAStatus,
) => void;

class OTAListener {
  private listeners: OTAStatusListener[] = [];

  subscribe(listener: OTAStatusListener) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter(
        l => l !== listener,
      );
    };
  }

  notify(status: OTAStatus) {
    this.listeners.forEach(listener => listener(status));
  }
}

export const otaListener = new OTAListener();