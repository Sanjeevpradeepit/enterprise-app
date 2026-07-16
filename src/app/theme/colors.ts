export interface Colors {
  // Primary
  primary: string;
  primaryLight: string;
  primaryDark: string;

  // Secondary
  secondary: string;

  // Backgrounds
  background: string;
  surface: string;
  card: string;

  // Text
  text: string;
  textSecondary: string;
  textDisabled: string;

  // Borders
  border: string;
  divider: string;

  // Status
  success: string;
  warning: string;
  error: string;
  info: string;

  // Misc
  white: string;
  black: string;
  transparent: string;

  // Overlay
  overlay: string;
}

export const CommonColors = {
  primary: '#2563EB',
  primaryLight: '#60A5FA',
  primaryDark: '#1D4ED8',

  secondary: '#8B5CF6',

  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#06B6D4',

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  overlay: 'rgba(0,0,0,0.5)',
};