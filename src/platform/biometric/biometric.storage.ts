import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV({
  id: 'biometric-storage',
});

const BIOMETRIC_ENABLED = 'biometric_enabled';

class BiometricStorage {
  enable() {
    storage.set(BIOMETRIC_ENABLED, true);
  }

  disable() {
    storage.remove(BIOMETRIC_ENABLED);
  }

  isEnabled(): boolean {
    return storage.getBoolean(BIOMETRIC_ENABLED) ?? false;
  }

  toggle() {
    if (this.isEnabled()) {
      this.disable();
    } else {
      this.enable();
    }
  }

  clear() {
    storage.clearAll();
  }
}

export const biometricStorage =
  new BiometricStorage();