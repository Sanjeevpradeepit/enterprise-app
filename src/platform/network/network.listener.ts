import { networkService } from './network.service';

class NetworkListener {
  private unsubscribe?: () => void;

  register() {
    this.unsubscribe =
      networkService.subscribe(state => {
        console.log(
          '[Network]',
          state.type,
          state.isConnected,
        );
      });
  }

  unregister() {
    this.unsubscribe?.();

    this.unsubscribe = undefined;
  }
}

export const networkListener =
  new NetworkListener();