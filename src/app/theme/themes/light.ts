import { CommonColors } from '../colors';
import { radius } from '../radius';
import { shadows } from '../shadows';
import { spacing } from '../spacing';
import { typography } from '../typography';

export const lightTheme = {
  dark: false,

  colors: {
    ...CommonColors,

    background: '#F8FAFC',

    surface: '#FFFFFF',

    card: '#FFFFFF',

    text: '#111827',

    textSecondary: '#6B7280',

    textDisabled: '#9CA3AF',

    border: '#E5E7EB',

    divider: '#F3F4F6',
  },

  spacing,

  radius,

  typography,

  shadows,
};

export type AppTheme = typeof lightTheme;