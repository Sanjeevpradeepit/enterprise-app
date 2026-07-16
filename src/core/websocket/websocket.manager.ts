

import { heartbeatService } from './heartbeat.service';
import { messageHandler } from './message.handler';
import { reconnectService } from './reconnect.service';
import { websocketService } from './websocket.service';

import {
  WS_STATUS,
} from './constants';

import type { WebSocketStatus } from './types';
import { tokenService } from '../auth';

class WebSocketManager {
  private status: WebSocketStatus =
    WS_STATUS.DISCONNECTED;

  private url = '';

  initialize(url: string) {
    this.url = url;
  }

  connect() {
    if (!this.url) {
      console.warn(
        '[WebSocket] URL not configured.',
      );
      return;
    }

    if (
      this.status === WS_STATUS.CONNECTED ||
      this.status === WS_STATUS.CONNECTING
    ) {
      return;
    }

    const token = tokenService.getAccessToken();

    if (!token) {
      console.warn(
        '[WebSocket] Access token missing.',
      );
      return;
    }

    this.status = WS_STATUS.CONNECTING;

    websocketService.connect(this.url);

    websocketService.onOpen(() => {
      console.log('[WebSocket] Connected');

      this.status = WS_STATUS.CONNECTED;

      reconnectService.reset();

      heartbeatService.start();
    });

    websocketService.onClose(() => {
      console.log('[WebSocket] Disconnected');

      heartbeatService.stop();

      this.status =
        WS_STATUS.RECONNECTING;

      reconnectService.schedule(() =>
        this.connect(),
      );
    });

    websocketService.onError(error => {
      console.error(
        '[WebSocket] Error',
        error,
      );
    });

    websocketService.onMessage(event => {
      messageHandler.handle(event.data);
    });
  }

  disconnect() {
    heartbeatService.stop();

    reconnectService.reset();

    websocketService.disconnect();

    this.status =
      WS_STATUS.DISCONNECTED;
  }

  send(
    event: string,
    data: unknown,
  ) {
    websocketService.send({
      event,
      data,
      timestamp: Date.now(),
    });
  }

  isConnected() {
    return websocketService.isConnected();
  }

  getStatus() {
    return this.status;
  }
}

export const websocketManager =
  new WebSocketManager();