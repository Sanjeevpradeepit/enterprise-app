import { useState } from 'react';

import { biometricService } from './biometric.service';

export function useBiometric() {
  const [loading, setLoading] =
    useState(false);

  async function authenticate() {
    setLoading(true);

    try {
      return await biometricService.authenticate();
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    authenticate,
  };
}