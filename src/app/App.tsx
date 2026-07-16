import React from 'react';

import { Providers } from './providers';
import { RootNavigator } from './navigation';

export function App() {
  return (
    <Providers>
      <RootNavigator />
    </Providers>
  );
}
