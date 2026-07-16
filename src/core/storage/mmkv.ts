import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({
  id: 'enterprise-storage',
});

export class MMKVStorage {
  set(key: string, value: string) {
    storage.set(key, value);
  }

  setBoolean(key: string, value: boolean) {
    storage.set(key, value);
  }

  setNumber(key: string, value: number) {
    storage.set(key, value);
  }

  getString(key: string) {
    return storage.getString(key) ?? null;
  }

  getBoolean(key: string) {
    return storage.getBoolean(key);
  }

  getNumber(key: string) {
    return storage.getNumber(key);
  }

  remove(key: string) {
    storage.remove(key);
  }

  clear() {
    storage.clearAll();
  }

  contains(key: string) {
    return storage.contains(key);
  }
}

export const mmkvStorage = new MMKVStorage();