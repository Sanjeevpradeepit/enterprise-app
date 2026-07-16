import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Appearance } from 'react-native';

import { createMMKV } from 'react-native-mmkv';

import { darkTheme } from './themes/dark';
import { lightTheme, AppTheme } from './themes/light';

const storage = createMMKV();

const STORAGE_KEY = 'APP_THEME';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: AppTheme;

  mode: ThemeMode;

  setTheme: (mode: ThemeMode) => void;

  toggleTheme: () => void;
}

export const ThemeContext =
  createContext<ThemeContextType | null>(null);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<ThemeMode>(
    (storage.getString(STORAGE_KEY) as ThemeMode) ??
      'system',
  );

  const systemTheme = Appearance.getColorScheme();

  const currentTheme =
    mode === 'system'
      ? systemTheme === 'dark'
        ? darkTheme
        : lightTheme
      : mode === 'dark'
      ? darkTheme
      : lightTheme;

  useEffect(() => {
    storage.set(STORAGE_KEY, mode);
  }, [mode]);

  const value = useMemo(
    () => ({
      theme: currentTheme,

      mode,

      setTheme: setMode,

      toggleTheme: () =>
        setMode(prev =>
          prev === 'dark' ? 'light' : 'dark',
        ),
    }),
    [currentTheme, mode],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}