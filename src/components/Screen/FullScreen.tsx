import React from 'react';
import { View, StatusBar, StyleProp, ViewStyle } from 'react-native';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  statusBarStyle?: 'light-content' | 'dark-content';
}

export function FullScreen({
  children,
  style,
  backgroundColor = '#FFFFFF',
  statusBarStyle = 'dark-content',
}: Props) {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={statusBarStyle}
      />

      <View
        style={[
          {
            flex: 1,
            backgroundColor,
          },
          style,
        ]}
      >
        {children}
      </View>
    </>
  );
}
