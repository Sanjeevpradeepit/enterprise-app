class BiometricService {
  async isAvailable() {
    return false;
  }

  async authenticate() {
    return false;
  }
}

export const biometricService =
  new BiometricService();