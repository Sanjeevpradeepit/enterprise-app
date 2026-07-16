import { useColorScheme } from 'react-native';

import { useThemeContext } from '@/app/theme/useThemeContext';

export function useTheme() {
  const systemTheme = useColorScheme();

  const {
    theme,
    mode,
    toggleTheme,
    setTheme,
  } = useThemeContext();

  return {
    theme,
    mode,
    setTheme,
    toggleTheme,

    systemTheme,

    isDark: theme.dark,
  };
}