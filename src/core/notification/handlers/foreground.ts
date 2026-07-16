

import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { pushService } from '../push.service';

export async function handleForeground(
  message: FirebaseMessagingTypes.RemoteMessage,
) {
  console.log('[Notification] Foreground');

  await pushService.show(
    message.notification?.title ?? 'Notification',
    message.notification?.body ?? '',
  );

  // TODO:
  // Update unread notification count
  // Refresh Redux / Zustand
  // Update badge count
}