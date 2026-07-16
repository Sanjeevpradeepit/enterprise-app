export * from './constants';
export * from './types';

export * from './permissions';

export * from './geolocation.service';
export * from './background-location.service';
export * from './geofence.service';
export * from './location-storage.service';
export * from './location.service';

export * from './handlers/location.handler';
export * from './handlers/background.handler';
export * from './handlers/geofence.handler';

export * from './listeners/location.listener';
export * from './listeners/permission.listener';


// Usage
// Initialize (Providers)
// import { useEffect } from 'react';
// import { locationService } from '@/core/location';

// useEffect(() => {
//   locationService.initialize();
// }, []);
// After Login
// await locationService.requestPermission();

// await locationService.startTracking();
// Background Tracking
// await locationService.startBackgroundTracking();
// Register Geofence
// locationService.registerGeofence({
//   id: 'office',
//   latitude: 12.971599,
//   longitude: 77.594566,
//   radius: 100,
// });
// Current Location
// const location =
//   await locationService.getCurrentLocation();

// console.log(location.coords);
// Logout
// locationService.stopTracking();

// locationService.stopBackgroundTracking();

// locationService.clearStorage();

// locationService.destroy();