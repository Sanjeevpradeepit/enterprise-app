import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeProvider } from './theme';
import { ErrorBoundary } from '../core/crash';
import { otaService } from '../core/ota';
import { OTAIndicator } from '../components/OTA/OTAIndicator';
import { analyticsService } from '@/core/analytics';

type Props = {
  children: React.ReactNode;
};

export function Providers({ children }: Props) {
  useEffect(() => {
    otaService.sync();
    analyticsService.initialize();
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
