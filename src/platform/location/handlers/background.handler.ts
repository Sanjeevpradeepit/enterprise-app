import { GeoPosition } from 'react-native-geolocation-service';

import { locationStorageService } from '../location-storage.service';

import type { LocationData } from '../types';

/**
 * Handles background GPS updates.
 */
class BackgroundHandler {
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
       * Save locally
       */
      locationStorageService.savePendingLocation(
        location,
      );

      /**
       * TODO
       *
       * Queue upload
       * Sync later
       * Persist SQLite
       */

      console.log(
        '[Background Location]',
        location,
      );
    } catch (error) {
      console.error(
        '[Background Handler]',
        error,
      );
    }
  }
}

export const backgroundHandler =
  new BackgroundHandler();