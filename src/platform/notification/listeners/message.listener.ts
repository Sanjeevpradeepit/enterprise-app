import { firebaseService } from '../firebase';
import { handleForeground } from '../handlers/foreground';

class MessageListener {
  register() {
    return firebaseService.onMessage(async message => {
      console.log('[FCM] Foreground Message', message);

      await handleForeground(message);
    });
  }
}

export const messageListener = new MessageListener();