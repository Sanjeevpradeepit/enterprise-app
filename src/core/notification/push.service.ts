import {
  registerDevice,
  onForegroundMessage,
  onTokenRefresh,
} from './firebase';

import { requestNotificationPermission } from './permissions';

class PushService {
  async initialize() {
    const granted = await requestNotificationPermission();

    if (!granted) {
      console.log('Notification permission denied');
      return;
    }

    const token = await registerDevice();

    console.log('FCM:', token);

    onForegroundMessage(message => {
      console.log('Foreground Notification', message);
    });

    onTokenRefresh(token => {
      console.log('New Token', token);

      // Upload new token to backend
    });
  }

  async getToken() {
    return registerDevice();
  }
}

export const pushService = new PushService();