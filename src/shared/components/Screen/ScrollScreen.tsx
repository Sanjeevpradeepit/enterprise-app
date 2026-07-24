import React from 'react';
import { ScrollView, StatusBar, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  edges?: Edge[];
  backgroundColor?: string;
  statusBarStyle?: 'light-content' | 'dark-content';
}

export function ScrollScreen({
  children,
  style,
  contentContainerStyle,
  edges = ['top', 'bottom'],
  backgroundColor = '#FFFFFF',
  statusBarStyle = 'dark-content',
}: Props) {
  return (
    <>
      <StatusBar barStyle={statusBarStyle} backgroundColor={backgroundColor} />

      <SafeAreaView
        edges={edges}
        style={{
          flex: 1,
          backgroundColor,
        }}
      >
        <ScrollView
          style={style}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={contentContainerStyle}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
