import { firebaseService } from './firebase';
import { permissionService } from './permissions';
import { pushService } from './push.service';
import { deviceTokenService } from './device-token.service';

import { messageListener } from './listeners/message.listener';
import { tokenListener } from './listeners/token.listener';

import { handleOpened } from './handlers/opened';
import { handleInitial } from './handlers/initial';

class NotificationService {
  async initialize() {
    const granted =
      await permissionService.requestPermission();

    if (!granted) {
      console.log(
        'Notification permission denied',
      );
      return;
    }

    await pushService.createChannel();

    const token =
      await firebaseService.getToken();

    if (token) {
      deviceTokenService.saveToken(token);

      console.log('FCM Token', token);

      // TODO
      // await api.registerDeviceToken(token);
    }

    messageListener.register();

    tokenListener.register();

    firebaseService.onNotificationOpenedApp(
      handleOpened,
    );

    await handleInitial();

    console.log(
      'Notification Initialized',
    );
  }
}

export const notificationService =
  new NotificationService();