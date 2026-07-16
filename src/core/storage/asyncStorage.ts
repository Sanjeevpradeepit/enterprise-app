import AsyncStorage from '@react-native-async-storage/async-storage';

export class AsyncStorageService {
  async set(key: string, value: unknown) {
    await AsyncStorage.setItem(
      key,
      JSON.stringify(value),
    );
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await AsyncStorage.getItem(key);

    return value ? JSON.parse(value) : null;
  }

  async remove(key: string) {
    await AsyncStorage.removeItem(key);
  }

  async clear() {
    await AsyncStorage.clear();
  }
}

export const asyncStorage =
  new AsyncStorageService();