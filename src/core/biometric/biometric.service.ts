import ReactNativeBiometrics from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

class BiometricService {
  async isAvailable() {
    const { available, biometryType } =
      await rnBiometrics.isSensorAvailable();

    return {
      available,
      biometryType,
    };
  }

  async authenticate() {
    const { success } =
      await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate',
      });

    return success;
  }
}

export const biometricService =
  new BiometricService();