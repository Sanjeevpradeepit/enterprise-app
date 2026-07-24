import { Platform } from 'react-native';

export const AppPermissions = {
  Notification:
    Platform.OS === 'android'
      ? 'android.permission.POST_NOTIFICATIONS'
      : 'ios.notification',

  Camera:
    Platform.OS === 'android'
      ? 'android.permission.CAMERA'
      : 'ios.camera',

  Location:
    Platform.OS === 'android'
      ? 'android.permission.ACCESS_FINE_LOCATION'
      : 'ios.location',

  Microphone:
    Platform.OS === 'android'
      ? 'android.permission.RECORD_AUDIO'
      : 'ios.microphone',

  Contacts:
    Platform.OS === 'android'
      ? 'android.permission.READ_CONTACTS'
      : 'ios.contacts',

  PhotoLibrary:
    Platform.OS === 'android'
      ? 'android.permission.READ_MEDIA_IMAGES'
      : 'ios.photoLibrary',
} as const;