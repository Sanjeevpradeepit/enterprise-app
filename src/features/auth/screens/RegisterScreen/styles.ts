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
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.md,
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
      fontSize: 16,
      fontWeight: '700',
    },
    loginContainer: {
      marginTop: theme.spacing.lg,
      alignItems: 'center',
    },

    loginText: {
      color: theme.colors.textSecondary,
      fontSize: 15,
    },

    loginLink: {
      color: theme.colors.primary,
      fontWeight: '700',
    },
  });
