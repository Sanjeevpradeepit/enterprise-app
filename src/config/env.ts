import Config from 'react-native-config';

export const Env = {
  APP_NAME: Config.APP_NAME,

  ENV: Config.ENV,

  API_URL: Config.API_URL,

  WS_URL: Config.WS_URL,

  GOOGLE_WEB_CLIENT_ID:
    Config.GOOGLE_WEB_CLIENT_ID,

  SENTRY_DSN: Config.SENTRY_DSN,

  FIREBASE_PROJECT_ID:
    Config.FIREBASE_PROJECT_ID,

  OTA_ENABLED:
    Config.OTA_ENABLED === 'true',
};