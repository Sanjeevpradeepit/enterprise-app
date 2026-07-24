import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface Props {
  error?: Error;
  resetError?: () => void;
}

export function CrashFallback({
  error,
  resetError,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Something went wrong
      </Text>

      <Text style={styles.message}>
        {error?.message}
      </Text>

      <Pressable
        style={styles.button}
        onPress={resetError}>
        <Text style={styles.buttonText}>
          Try Again
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },

  message: {
    textAlign: 'center',
    marginBottom: 24,
  },

  button: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: '600',
  },
});