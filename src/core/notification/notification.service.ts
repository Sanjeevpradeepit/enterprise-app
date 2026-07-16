import notifee, {
  AndroidImportance,
} from '@notifee/react-native';

class NotificationService {
  async initialize() {
    await notifee.createChannel({
      id: 'default',
      name: 'Default',
      importance: AndroidImportance.HIGH,
    });
  }

  async showNotification(
    title: string,
    body: string,
  ) {
    await notifee.displayNotification({
      title,
      body,

      android: {
        channelId: 'default',
      },
    });
  }
}

export const notificationService =
  new NotificationService();