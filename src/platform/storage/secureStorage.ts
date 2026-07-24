import * as Keychain from 'react-native-keychain';

export class SecureStorage {
  async save(
    username: string,
    password: string,
  ) {
    await Keychain.setGenericPassword(
      username,
      password,
    );
  }

  async get() {
    return Keychain.getGenericPassword();
  }

  async reset() {
    await Keychain.resetGenericPassword();
  }
}

export const secureStorage =
  new SecureStorage();