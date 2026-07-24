import notifee, {
  AndroidImportance,
} from '@notifee/react-native';

import { NOTIFICATION_CHANNEL } from './constants';

class PushService {
  async createChannel() {
    await notifee.createChannel({
      id: NOTIFICATION_CHANNEL.DEFAULT,
      name: 'Default',
      importance: AndroidImportance.HIGH,
    });
  }

  async show(
  title: string | object | undefined,
  body: string | object | undefined,
) {
  await notifee.displayNotification({
    title:
      typeof title === 'string'
        ? title
        : 'Notification',

    body:
      typeof body === 'string'
        ? body
        : '',

    android: {
      channelId: NOTIFICATION_CHANNEL.DEFAULT,
    },
  });
}

  async cancel(id: string) {
    await notifee.cancelNotification(id);
  }

  async cancelAll() {
    await notifee.cancelAllNotifications();
  }

  async setBadge(count: number) {
    await notifee.setBadgeCount(count);
  }

  async clearBadge() {
    await notifee.setBadgeCount(0);
  }
}

export const pushService =
  new PushService();