import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

class FirebaseService {
  async getToken(): Promise<string | null> {
    try {
      return await messaging().getToken();
    } catch (e) {
      console.error('FCM Token Error', e);
      return null;
    }
  }

  async deleteToken() {
    await messaging().deleteToken();
  }

  async subscribeTopic(topic: string) {
    await messaging().subscribeToTopic(topic);
  }

  async unsubscribeTopic(topic: string) {
    await messaging().unsubscribeFromTopic(topic);
  }

  onMessage(
    callback: (
      message: FirebaseMessagingTypes.RemoteMessage,
    ) => void,
  ) {
    return messaging().onMessage(callback);
  }

  onTokenRefresh(
    callback: (token: string) => void,
  ) {
    return messaging().onTokenRefresh(callback);
  }

  onNotificationOpenedApp(
    callback: (
      message: FirebaseMessagingTypes.RemoteMessage,
    ) => void,
  ) {
    return messaging().onNotificationOpenedApp(callback);
  }

  getInitialNotification() {
    return messaging().getInitialNotification();
  }
}

export const firebaseService = new FirebaseService();