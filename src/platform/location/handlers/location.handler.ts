import { GeoPosition } from 'react-native-geolocation-service';

import { locationStorageService } from '../location-storage.service';

import type { LocationData } from '../types';

/**
 * Handles foreground GPS updates.
 */
class LocationHandler {
  async handle(position: GeoPosition): Promise<void> {
    try {
      const location: LocationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude ?? undefined,
        heading: position.coords.heading ?? undefined,
        speed: position.coords.speed ?? undefined,
        timestamp: position.timestamp,
      };

      /**
       * Save latest location
       */
      locationStorageService.saveLocation(location);

      /**
       * Queue for backend sync
       */
      locationStorageService.savePendingLocation(location);

      /**
       * TODO
       *
       * Upload immediately
       * Update Zustand/Redux store
       * Emit websocket event
       * Update map marker
       */

      console.log(
        '[Location] Updated',
        location,
      );
    } catch (error) {
      console.error(
        '[Location] Handler Error',
        error,
      );
    }
  }
}

export const locationHandler =
  new LocationHandler();