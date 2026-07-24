import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeProvider } from './theme';
import { ErrorBoundary } from '../platform/crash';
import { otaService } from '../platform/ota';
import { analyticsService } from '@/platform/analytics';
import { notificationService } from '@/platform/notification';
import { websocketManager } from '@/platform/websocket';
import { locationService } from '@/platform/location';
import { networkListener } from '@/platform/network';
import { OTAIndicator } from '@/shared/components/OTA/OTAIndicator';

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
