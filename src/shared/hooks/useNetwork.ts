import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

export function useNetwork() {
  const [isConnected, setIsConnected] =
    useState(true);

  const [isInternetReachable, setReachable] =
    useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(
      state => {
        setIsConnected(state.isConnected ?? false);

        setReachable(
          state.isInternetReachable ?? false,
        );
      },
    );

    return unsubscribe;
  }, []);

  return {
    isConnected,
    isInternetReachable,
    offline: !isConnected || !isInternetReachable,
  };
}

// Usage

// const { offline } = useNetwork();

// if (offline) {
//   console.log('No Internet');
// }