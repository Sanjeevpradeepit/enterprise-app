import { geolocationService } from '../geolocation.service';
import { locationHandler } from '../handlers/location.handler';

class LocationListener {
  private watchId: number | null = null;

  start() {
    if (this.watchId !== null) {
      return;
    }

    this.watchId =
      geolocationService.watchLocation(
        async position => {
          await locationHandler.handle(
            position,
          );
        },
        error => {
          console.error(
            '[Location Listener]',
            error,
          );
        },
      );
  }

  stop() {
    geolocationService.stopWatching();

    this.watchId = null;
  }
}

export const locationListener =
  new LocationListener();