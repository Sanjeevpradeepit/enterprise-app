import { Platform } from 'react-native';

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

export const androidVersion =
  Platform.OS === 'android'
    ? Number(Platform.Version)
    : 0;