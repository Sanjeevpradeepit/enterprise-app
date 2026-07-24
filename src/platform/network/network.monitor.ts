import { networkService } from './network.service';

class NetworkMonitor {
  async checkConnection() {
    const connected =
      await networkService.isConnected();

    if (connected) {
      console.log(
        '[Network] Online',
      );
    } else {
      console.log(
        '[Network] Offline',
      );
    }

    return connected;
  }
}

export const networkMonitor =
  new NetworkMonitor();