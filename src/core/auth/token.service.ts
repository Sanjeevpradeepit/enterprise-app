import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({
  id: 'enterprise-app',
});

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

class TokenService {
  saveAccessToken(token: string) {
    storage.set(ACCESS_TOKEN, token);
  }

  saveRefreshToken(token: string) {
    storage.set(REFRESH_TOKEN, token);
  }

  getAccessToken() {
    return storage.getString(ACCESS_TOKEN) ?? null;
  }

  getRefreshToken() {
    return storage.getString(REFRESH_TOKEN) ?? null;
  }

  removeTokens() {
    storage.remove(ACCESS_TOKEN);
    storage.remove(REFRESH_TOKEN);
  }

  hasToken() {
    return !!this.getAccessToken();
  }
}

export const tokenService = new TokenService();
