import { createMMKV } from 'react-native-mmkv';

import {
  LOCATION_STORAGE_KEYS,
} from './constants';

import { LocationData } from './types';

const storage = createMMKV();

class LocationStorageService {
  saveLocation(location: LocationData) {
    storage.set(
      LOCATION_STORAGE_KEYS.LAST_LOCATION,
      JSON.stringify(location),
    );
  }

  getLastLocation(): LocationData | null {
    const value = storage.getString(
      LOCATION_STORAGE_KEYS.LAST_LOCATION,
    );

    return value ? JSON.parse(value) : null;
  }

  savePendingLocation(
    location: LocationData,
  ) {
    const pending =
      this.getPendingLocations();

    pending.push(location);

    storage.set(
      LOCATION_STORAGE_KEYS.PENDING_LOCATIONS,
      JSON.stringify(pending),
    );
  }

  getPendingLocations(): LocationData[] {
    const value = storage.getString(
      LOCATION_STORAGE_KEYS.PENDING_LOCATIONS,
    );

    return value ? JSON.parse(value) : [];
  }

  clearPending() {
    storage.remove(
      LOCATION_STORAGE_KEYS.PENDING_LOCATIONS,
    );
  }

  clear() {
    storage.remove(
      LOCATION_STORAGE_KEYS.LAST_LOCATION,
    );

    storage.remove(
      LOCATION_STORAGE_KEYS.PENDING_LOCATIONS,
    );
  }
}

export const locationStorageService =
  new LocationStorageService();