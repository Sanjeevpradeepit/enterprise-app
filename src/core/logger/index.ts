export * from './constants';
export * from './types';
export * from './transports';
export * from './logger.service';




// Usage
// Simple log
// import { logger } from '@/core/logger';

// logger.info('Application started');
// API
// logger.debug('API Request', {
//   url,
//   method,
// });
// Error
// try {
//   await api.login();
// } catch (error) {
//   logger.error(
//     'Login Failed',
//     error,
//   );
// }
// WebSocket
// logger.info(
//   'WebSocket Connected',
// );
// Notification
// logger.info(
//   'FCM Token Updated',
//   {
//     token,
//   },
// );
// Location
// logger.debug(
//   'Location Updated',
//   location,
// );