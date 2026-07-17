import { create } from 'zustand';

interface SettingsState {
  biometricEnabled: boolean;

  notificationEnabled: boolean;

  locationEnabled: boolean;

  language: string;

  enableBiometric: (
    enabled: boolean,
  ) => void;

  enableNotifications: (
    enabled: boolean,
  ) => void;

  enableLocation: (
    enabled: boolean,
  ) => void;

  setLanguage: (
    language: string,
  ) => void;

  reset: () => void;
}

export const useSettingsStore =
  create<SettingsState>(set => ({
    biometricEnabled: false,

    notificationEnabled: true,

    locationEnabled: false,

    language: 'en',

    enableBiometric:
      biometricEnabled =>
        set({
          biometricEnabled,
        }),

    enableNotifications:
      notificationEnabled =>
        set({
          notificationEnabled,
        }),

    enableLocation:
      locationEnabled =>
        set({
          locationEnabled,
        }),

    setLanguage: language =>
      set({
        language,
      }),

    reset: () =>
      set({
        biometricEnabled: false,
        notificationEnabled: true,
        locationEnabled: false,
        language: 'en',
      }),
  }));