import { CommonColors } from '../colors';
import { radius } from '../radius';
import { shadows } from '../shadows';
import { spacing } from '../spacing';
import { typography } from '../typography';

export const darkTheme = {
  dark: true,

  colors: {
    ...CommonColors,

    background: '#111827',

    surface: '#1F2937',

    card: '#374151',

    text: '#FFFFFF',

    textSecondary: '#D1D5DB',

    textDisabled: '#6B7280',

    border: '#374151',

    divider: '#4B5563',
  },

  spacing,

  radius,

  typography,

  shadows,
};