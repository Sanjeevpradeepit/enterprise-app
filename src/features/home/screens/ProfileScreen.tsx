import { Screen } from '@/shared/components/Screen';
import React from 'react';
import { View, Text } from 'react-native';

export function ProfileScreen() {
  return (
    <Screen gradientColors={['#0A57A5', '#0F6BD8']}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <Text>Profile Screen</Text>
      </View>
    </Screen>
  );
}
