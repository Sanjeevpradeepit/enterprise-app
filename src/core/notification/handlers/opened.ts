import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

// import { navigationService } from '@/core/navigation';
// import { notificationStore } from '@/store';

export async function handleOpened(
  message: FirebaseMessagingTypes.RemoteMessage,
): Promise<void> {
  try {
    console.log('[Notification] Opened');
    console.log(message);

    const data = message.data ?? {};

    /**
     * Example:
     * Mark notification as read
     */

    // notificationStore.markAsRead(data.notificationId);

    switch (data.type) {
      case 'CHAT':
        console.log('Navigate -> Chat');

        // navigationService.navigate('Chat', {
        //   chatId: data.chatId,
        // });

        break;

      case 'JOB':
        console.log('Navigate -> Job Details');

        // navigationService.navigate('JobDetails', {
        //   jobId: data.jobId,
        // });

        break;

      case 'PROFILE':
        console.log('Navigate -> Profile');

        // navigationService.navigate('Profile', {
        //   userId: data.userId,
        // });

        break;

      case 'NOTIFICATION':
        console.log('Navigate -> Notification Details');

        // navigationService.navigate('NotificationDetails', {
        //   notificationId: data.notificationId,
        // });

        break;

      case 'HOME':
        console.log('Navigate -> Home');

        // navigationService.navigate('Home');

        break;

      default:
        console.log('Navigate -> Notifications');

        // navigationService.navigate('Notifications');

        break;
    }
  } catch (error) {
    console.error(
      '[Notification] Opened Error',
      error,
    );
  }
}