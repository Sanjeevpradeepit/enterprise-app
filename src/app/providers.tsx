import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeProvider } from './theme';
import { ErrorBoundary } from '../core/crash';
import { otaService } from '../core/ota';
import { OTAIndicator } from '../components/OTA/OTAIndicator';
import { analyticsService } from '@/core/analytics';
import { notificationService } from '@/core/notification';
import { websocketManager } from '@/core/websocket';
import { locationService } from '@/core/location';
import { networkListener } from '@/core/network';

type Props = {
  children: React.ReactNode;
};

export function Providers({ children }: Props) {
  useEffect(() => {
    async function initialize() {
      otaService.sync();
      analyticsService.initialize();
      // notificationService.initialize();
      websocketManager.initialize('wss://api.enterprise.com/ws');
      locationService.initialize();
      networkListener.register();
    }

    initialize();

    return () => {
      networkListener.unregister();

      locationService.destroy();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <ErrorBoundary>
          {' '}
          <>
            {children}
            <OTAIndicator />
          </>
        </ErrorBoundary>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
