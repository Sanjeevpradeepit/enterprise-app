import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

export interface NotificationPayload {
  id?: string;
  type?: string;
  title?: string;
  body?: string;
  image?: string;
  route?: string;
  data?: Record<string, string>;
}

export type RemoteNotification =
  FirebaseMessagingTypes.RemoteMessage;