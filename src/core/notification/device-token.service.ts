import { storage } from '@/core/storage';

const KEY = 'fcm_token';

class DeviceTokenService {
  saveToken(token: string) {
    storage.set(KEY, token);
  }

  getToken() {
    return storage.getString(KEY) ?? null;
  }

  removeToken() {
    storage.remove(KEY);
  }
}

export const deviceTokenService =
  new DeviceTokenService();