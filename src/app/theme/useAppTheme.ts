import { useThemeContext } from './useThemeContext';

export function useAppTheme() {
  const {
    theme,
    mode,
    toggleTheme,
    setTheme,
  } = useThemeContext();

  return {
    ...theme,
    mode,
    isDark: theme.dark,
    toggleTheme,
    setTheme,
  };
}


// const {
//   colors,
//   spacing,
//   typography,
//   radius,
//   shadows,
//   isDark,
//   toggleTheme,
// } = useAppTheme();