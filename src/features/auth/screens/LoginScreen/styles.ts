import { AppTheme } from '@/app/theme';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.xl,
      backgroundColor: theme.colors.background,
    },

    header: {
      marginBottom: theme.spacing.xxl,
    },

    registerText: {
      marginTop: theme.spacing.lg,
      textAlign: 'center',
      color: theme.colors.textSecondary,
    },

    registerLink: {
      color: theme.colors.primary,
      fontWeight: '700',
    },

    title: {
      ...theme.typography.h1,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },

    subtitle: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
    },

    form: {
      gap: theme.spacing.md,
    },

    input: {
      height: 56,
      borderRadius: theme.radius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      color: theme.colors.text,
      fontSize: 16,
    },

    button: {
      height: 56,
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: theme.spacing.md,
    },

    buttonText: {
      color: '#FFFFFF',
      fontWeight: '700',
      fontSize: 16,
    },
  });
