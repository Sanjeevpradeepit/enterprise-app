export enum BiometricType {
  NONE = 'NONE',
  TOUCH_ID = 'TOUCH_ID',
  FACE_ID = 'FACE_ID',
  BIOMETRICS = 'BIOMETRICS',
}

export interface BiometricResult {
  success: boolean;
  error?: string;
}