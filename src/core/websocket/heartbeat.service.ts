import { websocketService } from './websocket.service';
import { WS_EVENTS, HEARTBEAT_INTERVAL } from './constants';

class HeartbeatService {
  private interval?: ReturnType<typeof setInterval>;

  start() {
    this.stop();

    this.interval = setInterval(() => {
      if (!websocketService.isConnected()) {
        return;
      }

      websocketService.send({
        event: WS_EVENTS.PING,
        data: {},
        timestamp: Date.now(),
      });
    }, HEARTBEAT_INTERVAL);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);

      this.interval = undefined;
    }
  }
}

export const heartbeatService = new HeartbeatService();