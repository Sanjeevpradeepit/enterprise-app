import { backgroundLocationService } from './background-location.service';
import { geofenceService } from './geofence.service';
import { geolocationService } from './geolocation.service';
import { locationStorageService } from './location-storage.service';
import { permissionService } from './permissions';

import { locationListener } from './listeners/location.listener';
import { permissionListener } from './listeners/permission.listener';

import type { GeofenceRegion } from './types';

/**
 * Enterprise Location Service
 *
 * Responsibilities
 * ----------------
 * ✓ Initialize location module
 * ✓ Request permissions
 * ✓ Start foreground tracking
 * ✓ Stop tracking
 * ✓ Background tracking
 * ✓ Geofence registration
 * ✓ Listener registration
 * ✓ Expose current location
 */
class LocationService {
  private initialized = false;

  /**
   * Initialize module
   */
  async initialize() {
    if (this.initialized) {
      return;
    }

    console.log('[Location] Initializing...');

    backgroundLocationService.initialize();

    permissionListener.register();

    this.initialized = true;
  }

  /**
   * Request permissions
   */
  async requestPermission() {
    const foreground =
      await permissionService.requestForegroundPermission();

    if (!foreground) {
      console.warn(
        '[Location] Foreground permission denied',
      );

      return false;
    }

    await permissionService.requestBackgroundPermission();

    return true;
  }

  /**
   * Start location tracking
   */
  async startTracking() {
    const granted =
      await permissionService.hasForegroundPermission();

    if (!granted) {
      console.warn(
        '[Location] Permission not granted',
      );

      return;
    }

    console.log(
      '[Location] Starting foreground tracking',
    );

    locationListener.start();
  }

  /**
   * Stop foreground tracking
   */
  stopTracking() {
    console.log(
      '[Location] Stopping foreground tracking',
    );

    locationListener.stop();
  }

  /**
   * Start background tracking
   */
  async startBackgroundTracking() {
    await backgroundLocationService.start();
  }

  /**
   * Stop background tracking
   */
  stopBackgroundTracking() {
    backgroundLocationService.stop();
  }

  /**
   * Get current location
   */
  async getCurrentLocation() {
    return geolocationService.getCurrentLocation();
  }

  /**
   * Save current location
   */
  saveLocation(location: Parameters<
    typeof locationStorageService.saveLocation
  >[0]) {
    locationStorageService.saveLocation(location);
  }

  /**
   * Last cached location
   */
  getLastLocation() {
    return locationStorageService.getLastLocation();
  }

  /**
   * Pending offline locations
   */
  getPendingLocations() {
    return locationStorageService.getPendingLocations();
  }

  /**
   * Register Geofence
   */
  registerGeofence(region: GeofenceRegion) {
    geofenceService.add(region);
  }

  /**
   * Remove Geofence
   */
  removeGeofence(id: string) {
    geofenceService.remove(id);
  }

  /**
   * Remove all Geofences
   */
  clearGeofences() {
    geofenceService.removeAll();
  }

  /**
   * Clear cached locations
   */
  clearStorage() {
    locationStorageService.clear();
  }

  /**
   * Shutdown service
   */
  destroy() {
    console.log('[Location] Destroy');

    this.stopTracking();

    this.stopBackgroundTracking();

    permissionListener.unregister();

    backgroundLocationService.destroy();

    this.initialized = false;
  }
}

export const locationService =
  new LocationService();