import {
  AppState,
  AppStateStatus,
  NativeEventSubscription,
} from 'react-native';

import { geolocationService } from './geolocation.service';
import { locationStorageService } from './location-storage.service';

import type { LocationData } from './types';

/**
 * Enterprise wrapper for background location.
 *
 * Replace the internals with
 * react-native-background-geolocation
 * if background tracking is required.
 */
class BackgroundLocationService {
  private enabled = false;

  private appState: AppStateStatus =
    AppState.currentState;

  private appStateSubscription?: NativeEventSubscription;

  initialize() {
    this.appStateSubscription =
      AppState.addEventListener(
        'change',
        this.onAppStateChange,
      );
  }

  destroy() {
    this.appStateSubscription?.remove();

    this.appStateSubscription = undefined;

    this.stop();
  }

  private onAppStateChange = (
    state: AppStateStatus,
  ) => {
    this.appState = state;

    console.log(
      '[Location] AppState:',
      state,
    );
  };

  async start() {
    if (this.enabled) {
      return;
    }

    this.enabled = true;

    console.log(
      '[Location] Background tracking started',
    );

    geolocationService.watchLocation(position => {
      const location: LocationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        altitude:
          position.coords.altitude ??
          undefined,
        heading:
          position.coords.heading ??
          undefined,
        speed:
          position.coords.speed ??
          undefined,
        timestamp: position.timestamp,
      };

      locationStorageService.savePendingLocation(
        location,
      );

      console.log(
        '[Location] Background update',
        location,
      );

      /**
       * TODO
       *
       * Queue upload
       * Sync with backend
       * Update local database
       */
    });
  }

  stop() {
    if (!this.enabled) {
      return;
    }

    this.enabled = false;

    geolocationService.stopWatching();

    console.log(
      '[Location] Background tracking stopped',
    );
  }

  isRunning() {
    return this.enabled;
  }
}

export const backgroundLocationService =
  new BackgroundLocationService();