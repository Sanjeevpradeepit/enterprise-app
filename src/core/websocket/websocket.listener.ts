import { websocketEmitter } from './event-emitter';

class WebSocketListener {
  on<T = any>(
    event: string,
    callback: (payload: T) => void,
  ) {
    return websocketEmitter.on(
      event,
      callback,
    );
  }

  off(
    event: string,
    callback: (payload: any) => void,
  ) {
    websocketEmitter.off(
      event,
      callback,
    );
  }

  removeAll() {
    websocketEmitter.removeAll();
  }
}

export const websocketListener =
  new WebSocketListener();