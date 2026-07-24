import {
  BASE_RECONNECT_DELAY,
  MAX_RECONNECT_ATTEMPTS,
} from './constants';

class ReconnectService {
  private attempts = 0;

  private timeout?: ReturnType<typeof setTimeout>;

  schedule(callback: () => void) {
    if (this.attempts >= MAX_RECONNECT_ATTEMPTS) {
      console.warn(
        '[WebSocket] Maximum reconnect attempts reached',
      );
      return;
    }

    const delay =
      BASE_RECONNECT_DELAY * Math.pow(2, this.attempts);

    console.log(
      `[WebSocket] Reconnecting in ${delay} ms`,
    );

    this.timeout = setTimeout(() => {
      this.attempts++;

      callback();
    }, delay);
  }

  reset() {
    this.attempts = 0;

    if (this.timeout) {
      clearTimeout(this.timeout);

      this.timeout = undefined;
    }
  }

  getAttempts() {
    return this.attempts;
  }
}

export const reconnectService =
  new ReconnectService();