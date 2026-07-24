import { Platform } from 'react-native';

import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';

class OCRPermissionService {
  private getPermission() {
    if (Platform.OS === 'ios') {
      return PERMISSIONS.IOS.CAMERA;
    }

    return PERMISSIONS.ANDROID.CAMERA;
  }

  async hasPermission(): Promise<boolean> {
    const status = await check(
      this.getPermission(),
    );

    return status === RESULTS.GRANTED;
  }

  async requestPermission(): Promise<boolean> {
    const status = await request(
      this.getPermission(),
    );

    return status === RESULTS.GRANTED;
  }

  async ensurePermission(): Promise<boolean> {
    const granted =
      await this.hasPermission();

    if (granted) {
      return true;
    }

    return this.requestPermission();
  }

  openSettings() {
    openSettings();
  }
}

export const ocrPermissions =
  new OCRPermissionService();