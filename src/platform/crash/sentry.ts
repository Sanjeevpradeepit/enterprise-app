import * as Sentry from '@sentry/react-native';

export function initializeSentry() {
  Sentry.init({
    dsn: 'YOUR_DSN',
  });
}