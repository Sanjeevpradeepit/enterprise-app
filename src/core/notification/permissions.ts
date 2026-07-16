import {
  PermissionsAndroid,
  Platform,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export class NotificationPermissionService {
  async requestPermission() {
    if (Platform.OS === 'ios') {
      const status =
        await messaging().requestPermission();

      return (
        status ===
          messaging.AuthorizationStatus.AUTHORIZED ||
        status ===
          messaging.AuthorizationStatus.PROVISIONAL
      );
    }

    if (
      Platform.OS === 'android' &&
      Number(Platform.Version) >= 33
    ) {
      const result =
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS
            .POST_NOTIFICATIONS,
        );

      return (
        result ===
        PermissionsAndroid.RESULTS.GRANTED
      );
    }

    return true;
  }

  async hasPermission() {
    if (Platform.OS === 'ios') {
      const status =
        await messaging().hasPermission();

      return (
        status ===
          messaging.AuthorizationStatus.AUTHORIZED ||
        status ===
          messaging.AuthorizationStatus.PROVISIONAL
      );
    }

    return true;
  }
}

export const permissionService =
  new NotificationPermissionService();