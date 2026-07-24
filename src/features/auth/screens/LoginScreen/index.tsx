import React from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Fingerprint } from 'lucide-react-native';

import { createStyles } from './styles';
import { RootStackParamList } from '@/app/navigation/types';
import { useBiometric } from '@/platform/biometric';
import { useAppTheme } from '@/app/theme';
import { Screen } from '@/shared/components/Screen';

export function LoginScreen() {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  const { authenticate } = useBiometric();

  async function loginWithBiometric() {
    const success = await authenticate();

    if (success) {
      console.log('Login Success');
    }
  }

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>

          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={theme.colors.textSecondary}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor={theme.colors.textSecondary}
            secureTextEntry
            style={styles.input}
          />

          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}>
              Don't have an account?{' '}
              <Text style={styles.registerLink}>Register</Text>
            </Text>
          </Pressable>

          <Pressable
            style={styles.biometricButton}
            onPress={loginWithBiometric}
          >
            <Fingerprint
              size={22}
              color={theme.colors.primary}
              strokeWidth={2}
            />

            <Text style={styles.biometricText}>Login with Biometrics</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
