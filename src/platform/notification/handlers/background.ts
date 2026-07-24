import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import { pushService } from '../push.service';
// import { notificationRepository } from '../repository';
// import { notificationApi } from '../api';
// import { notificationStore } from '@/store';

export async function handleBackground(
  message: FirebaseMessagingTypes.RemoteMessage,
): Promise<void> {
  try {
    console.log('[Notification] Background');
    console.log(message);

    const notification = message.notification;
    const data = message.data ?? {};
    const title =
      typeof notification?.title === 'string'
        ? notification.title
        : data.title ?? 'Notification';

    const body =
      typeof notification?.body === 'string'
        ? notification.body
        : data.body ?? '';

    /**
     * Save notification locally
     */

    // await notificationRepository.save({
    //   id: data.notificationId,
    //   title,
    //   body,
    //   data,
    //   createdAt: new Date(),
    // });

    /**
     * Synchronize with backend
     */

    // await notificationApi.sync();

    /**
     * Display local notification
     */

    await pushService.show(title, body);

    /**
     * Update badge count
     */

    // const unread =
    //   await notificationRepository.getUnreadCount();

    // await pushService.setBadge(unread);

    /**
     * Optional business logic
     */

    switch (data.type) {
      case 'CHAT':
        console.log('Background Chat Notification');
        break;

      case 'JOB':
        console.log('Background Job Notification');
        break;

      case 'PROFILE':
        console.log('Background Profile Notification');
        break;

      case 'SYSTEM':
        console.log('Background System Notification');
        break;

      default:
        console.log('Background General Notification');
        break;
    }
  } catch (error) {
    console.error('[Notification] Background Error', error);
  }
}
// Register this once in index.js or index.ts:

// import messaging from '@react-native-firebase/messaging';
// import { handleBackground } from './src/core/notification';

// messaging().setBackgroundMessageHandler(handleBackground);
