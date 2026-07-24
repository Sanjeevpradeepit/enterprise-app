import {
  WS_EVENTS,
} from './constants';

import { websocketEmitter } from './event-emitter';

import { WebSocketMessage } from './types';

class MessageHandler {
  handle(raw: string) {
    try {
      const message =
        JSON.parse(raw) as WebSocketMessage;

      switch (message.event) {
        case WS_EVENTS.AUTHENTICATED:
          console.log('[WS] Authenticated');

          websocketEmitter.emit(
            WS_EVENTS.AUTHENTICATED,
            message.data,
          );
          break;

        case WS_EVENTS.CHAT_MESSAGE:
          websocketEmitter.emit(
            WS_EVENTS.CHAT_MESSAGE,
            message.data,
          );
          break;

        case WS_EVENTS.CHAT_TYPING:
          websocketEmitter.emit(
            WS_EVENTS.CHAT_TYPING,
            message.data,
          );
          break;

        case WS_EVENTS.CHAT_READ:
          websocketEmitter.emit(
            WS_EVENTS.CHAT_READ,
            message.data,
          );
          break;

        case WS_EVENTS.NOTIFICATION:
          websocketEmitter.emit(
            WS_EVENTS.NOTIFICATION,
            message.data,
          );
          break;

        case WS_EVENTS.JOB_UPDATED:
          websocketEmitter.emit(
            WS_EVENTS.JOB_UPDATED,
            message.data,
          );
          break;

        case WS_EVENTS.PROFILE_UPDATED:
          websocketEmitter.emit(
            WS_EVENTS.PROFILE_UPDATED,
            message.data,
          );
          break;

        case WS_EVENTS.SYSTEM_ALERT:
          websocketEmitter.emit(
            WS_EVENTS.SYSTEM_ALERT,
            message.data,
          );
          break;

        case WS_EVENTS.ONLINE_USERS:
          websocketEmitter.emit(
            WS_EVENTS.ONLINE_USERS,
            message.data,
          );
          break;

        case WS_EVENTS.PONG:
          websocketEmitter.emit(
            WS_EVENTS.PONG,
            message.data,
          );
          break;

        default:
          console.warn(
            '[WebSocket] Unknown event:',
            message.event,
          );

          websocketEmitter.emit(
            message.event,
            message.data,
          );
      }
    } catch (error) {
      console.error(
        '[WebSocket] Invalid message',
        error,
      );
    }
  }
}

export const messageHandler =
  new MessageHandler();