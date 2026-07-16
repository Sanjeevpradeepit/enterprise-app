import Geolocation, {
  GeoPosition,
  GeoError,
} from 'react-native-geolocation-service';

import { LOCATION } from './constants';

class GeolocationService {
  private watchId: number | null =
    null;

  getCurrentLocation(): Promise<GeoPosition> {
    return new Promise(
      (resolve, reject) => {
        Geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy:
              LOCATION.ENABLE_HIGH_ACCURACY,
            timeout: LOCATION.TIMEOUT,
            maximumAge:
              LOCATION.MAXIMUM_AGE,
          },
        );
      },
    );
  }

  watchLocation(
    onSuccess: (
      position: GeoPosition,
    ) => void,
    onError?: (error: GeoError) => void,
  ) {
    this.watchId =
      Geolocation.watchPosition(
        onSuccess,
        onError,
        {
          enableHighAccuracy:
            LOCATION.ENABLE_HIGH_ACCURACY,
          interval: LOCATION.INTERVAL,
          fastestInterval:
            LOCATION.FASTEST_INTERVAL,
          distanceFilter:
            LOCATION.DISTANCE_FILTER,
        },
      );

    return this.watchId;
  }

  stopWatching() {
    if (this.watchId !== null) {
      Geolocation.clearWatch(
        this.watchId,
      );

      this.watchId = null;
    }

    Geolocation.stopObserving();
  }
}

export const geolocationService =
  new GeolocationService();