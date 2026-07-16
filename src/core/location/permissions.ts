import {
  Platform,
  PermissionsAndroid,
  Linking,
} from 'react-native';

import {
  check,
  request,
  RESULTS,
  PERMISSIONS,
} from 'react-native-permissions';

import {
  androidVersion,
} from '@/utils/platform';

class PermissionService {
  async requestForegroundPermission() {
    if (Platform.OS === 'ios') {
      const result = await request(
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      );

      return result === RESULTS.GRANTED;
    }

    const result = await request(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );

    return result === RESULTS.GRANTED;
  }

  async requestBackgroundPermission() {
    if (Platform.OS === 'ios') {
      const result = await request(
        PERMISSIONS.IOS.LOCATION_ALWAYS,
      );

      return result === RESULTS.GRANTED;
    }

    if (androidVersion >= 29) {
      const result = await request(
        PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
      );

      return result === RESULTS.GRANTED;
    }

    return true;
  }

  async hasForegroundPermission() {
    if (Platform.OS === 'ios') {
      const result = await check(
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      );

      return result === RESULTS.GRANTED;
    }

    const result = await check(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );

    return result === RESULTS.GRANTED;
  }

  openSettings() {
    Linking.openSettings();
  }
}

export const permissionService =
  new PermissionService();