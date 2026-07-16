export * from './analytics.service';
export * from './firebase';
export * from './events';
export * from './screen';
export * from './user';
export * from './types';



// Track an Event
// import {
//   analyticsService,
//   AnalyticsEvents,
// } from '@/core/analytics';

// await analyticsService.track(
//   AnalyticsEvents.LOGIN,
// );
// Track a Screen
// import { trackScreen } from '@/core/analytics';

// useEffect(() => {
//   trackScreen('Home');
// }, []);
// Identify a User
// import {
//   identifyUser,
//   setTenant,
// } from '@/core/analytics';

// await identifyUser(user.id);

// await setTenant(user.tenantId);