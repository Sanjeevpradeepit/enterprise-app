import React from 'react';
import {
  StatusBar,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  SafeAreaView,
  Edge,
} from 'react-native-safe-area-context';

import { useAppTheme } from '../../app/theme';

interface ScreenProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: Edge[];
  backgroundColor?: string;
  statusBarStyle?: 'light-content' | 'dark-content';
}

export function Screen({
  children,
  style,
  edges = ['top', 'bottom'],
  backgroundColor,
  statusBarStyle,
}: ScreenProps) {
  const { colors, isDark } = useAppTheme();

  const bgColor = backgroundColor ?? colors.background;

  const barStyle =
    statusBarStyle ??
    (isDark ? 'light-content' : 'dark-content');

  return (
    <>
      <StatusBar
        barStyle={barStyle}
        backgroundColor={bgColor}
      />

      <SafeAreaView
        edges={edges}
        style={[
          {
            flex: 1,
            backgroundColor: bgColor,
          },
          style,
        ]}
      >
        {children}
      </SafeAreaView>
    </>
  );
}