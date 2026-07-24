import { firebaseService } from '../firebase';
import { deviceTokenService } from '../device-token.service';

class TokenListener {
  register() {
    return firebaseService.onTokenRefresh(async token => {
      console.log('[FCM] Token Refreshed:', token);

      deviceTokenService.saveToken(token);

      // TODO
      // await api.updateDeviceToken(token);
    });
  }
}

export const tokenListener = new TokenListener();