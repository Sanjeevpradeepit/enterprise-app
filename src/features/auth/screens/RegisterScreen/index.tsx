import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { createStyles } from './styles';
import { useAppTheme } from '@/app/theme';
import { Screen } from '@/components/Screen';

import type { RootStackParamList } from '@/app/navigation/types';

export function RegisterScreen() {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList>
    >();

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Create Account
          </Text>

          <Text style={styles.subtitle}>
            Register to continue
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor={theme.colors.textSecondary}
            style={styles.input}
          />

          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={theme.colors.textSecondary}
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            secureTextEntry
            placeholderTextColor={theme.colors.textSecondary}
            style={styles.input}
          />

          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            placeholderTextColor={theme.colors.textSecondary}
            style={styles.input}
          />

          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>
              Register
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Already have an account?{' '}
              <Text style={styles.loginLink}>
                Login
              </Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}