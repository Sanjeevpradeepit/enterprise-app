import { tokenService } from '../auth';
import { WebSocketMessage } from './types';

class WebSocketService {
  private socket?: WebSocket;

  connect(url: string) {
    if (this.socket) {
      return;
    }

    const token = tokenService.getAccessToken();

    this.socket = new WebSocket(`${url}?token=${token}`);
  }

  disconnect() {
    this.socket?.close();

    this.socket = undefined;
  }

  send(message: WebSocketMessage) {
    if (!this.isConnected()) {
      return;
    }

    this.socket?.send(JSON.stringify(message));
  }

  onOpen(callback: () => void) {
    this.socket!.onopen = callback;
  }

  onClose(callback: () => void) {
    this.socket!.onclose = callback;
  }

  onError(callback: (e: Event) => void) {
    this.socket!.onerror = callback;
  }

  onMessage(callback: (event: WebSocketMessageEvent) => void) {
    this.socket!.onmessage = callback;
  }

  isConnected() {
    return this.socket?.readyState === WebSocket.OPEN;
  }

  getSocket() {
    return this.socket;
  }
}

export const websocketService = new WebSocketService();
