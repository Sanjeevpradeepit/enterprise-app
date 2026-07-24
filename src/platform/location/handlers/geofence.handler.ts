import { GeofenceRegion } from '../types';

/**
 * Enterprise Geofence Handler
 */
class GeofenceHandler {
  async onEnter(
    region: GeofenceRegion,
  ): Promise<void> {
    console.log(
      '[Geofence] Enter',
      region.id,
    );

    /**
     * TODO
     *
     * Attendance
     * Job Check-In
     * Notify Backend
     * Push Notification
     * Analytics
     */
  }

  async onExit(
    region: GeofenceRegion,
  ): Promise<void> {
    console.log(
      '[Geofence] Exit',
      region.id,
    );

    /**
     * TODO
     *
     * Attendance Check-Out
     * Stop Tracking
     * Upload Trip
     * Analytics
     */
  }
}

export const geofenceHandler =
  new GeofenceHandler();