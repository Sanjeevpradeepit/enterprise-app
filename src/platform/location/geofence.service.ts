import type {
  GeofenceRegion,
} from './types';

/**
 * Enterprise Geofence Manager
 *
 * Replace with native implementation
 * (react-native-background-geolocation)
 * for real geofence monitoring.
 */
class GeofenceService {
  private readonly regions =
    new Map<string, GeofenceRegion>();

  add(region: GeofenceRegion) {
    this.regions.set(region.id, region);

    console.log(
      '[Geofence] Added',
      region,
    );
  }

  remove(id: string) {
    this.regions.delete(id);

    console.log(
      '[Geofence] Removed',
      id,
    );
  }

  removeAll() {
    this.regions.clear();

    console.log(
      '[Geofence] Cleared',
    );
  }

  get(id: string) {
    return this.regions.get(id);
  }

  getAll(): GeofenceRegion[] {
    return Array.from(
      this.regions.values(),
    );
  }

  has(id: string) {
    return this.regions.has(id);
  }

  /**
   * Simulate geofence enter.
   *
   * Native SDKs trigger this automatically.
   */
  triggerEnter(id: string) {
    const region = this.get(id);

    if (!region) {
      return;
    }

    console.log(
      '[Geofence] Enter',
      region,
    );

    /**
     * TODO
     *
     * Attendance
     * Check-In
     * Notify User
     * API Call
     */
  }

  /**
   * Simulate geofence exit.
   */
  triggerExit(id: string) {
    const region = this.get(id);

    if (!region) {
      return;
    }

    console.log(
      '[Geofence] Exit',
      region,
    );

    /**
     * TODO
     *
     * Check-Out
     * Stop Tracking
     * Backend Update
     */
  }
}

export const geofenceService =
  new GeofenceService();