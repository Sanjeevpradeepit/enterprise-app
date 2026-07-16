export interface LocationCoordinate {
  latitude: number;

  longitude: number;
}

export interface LocationData extends LocationCoordinate {
  accuracy?: number;

  altitude?: number;

  heading?: number;

  speed?: number;

  timestamp: number;
}

export interface GeofenceRegion {
  id: string;

  latitude: number;

  longitude: number;

  radius: number;
}

export type PermissionType =
  | 'FOREGROUND'
  | 'BACKGROUND';