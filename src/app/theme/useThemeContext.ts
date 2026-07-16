import { useContext } from 'react';

import {ThemeContext} from './ThemeProvider';

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useThemeContext must be used within ThemeProvider',
    );
  }

  return context;
}