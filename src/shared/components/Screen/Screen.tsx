import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  Edge,
  SafeAreaView,
} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import { useAppTheme } from '@/app/theme';

interface ScreenProps {
  children: React.ReactNode;

  /**
   * SafeArea container style
   */
  style?: StyleProp<ViewStyle>;

  /**
   * ScrollView content style
   */
  contentContainerStyle?: StyleProp<ViewStyle>;

  /**
   * SafeArea edges
   */
  edges?: Edge[];

  /**
   * Solid background
   */
  backgroundColor?: string;

  /**
   * Gradient background
   */
  gradientColors?: string[];

  /**
   * Status bar style
   */
  statusBarStyle?: 'light-content' | 'dark-content';

  /**
   * Enable ScrollView
   */
  scrollable?: boolean;

  /**
   * Enable KeyboardAvoidingView
   */
  keyboardAware?: boolean;

  /**
   * ScrollView keyboard handling
   */
  keyboardShouldPersistTaps?:
    | 'always'
    | 'handled'
    | 'never';

  /**
   * Show Scroll Indicator
   */
  showsVerticalScrollIndicator?: boolean;
}

export function Screen({
  children,
  style,
  contentContainerStyle,

  edges = ['top', 'bottom'],

  backgroundColor,
  gradientColors,

  statusBarStyle,

  scrollable = false,

  keyboardAware = false,

  keyboardShouldPersistTaps = 'handled',

  showsVerticalScrollIndicator = false,
}: ScreenProps) {
  const { colors, isDark } = useAppTheme();

  const bgColor = backgroundColor ?? colors.background;

  const barStyle =
    statusBarStyle ??
    (isDark ? 'light-content' : 'dark-content');

  let content = children;

  /**
   * ScrollView
   */
  if (scrollable) {
    content = (
      <ScrollView
        keyboardShouldPersistTaps={
          keyboardShouldPersistTaps
        }
        showsVerticalScrollIndicator={
          showsVerticalScrollIndicator
        }
        contentContainerStyle={[
          {
            flexGrow: 1,
          },
          contentContainerStyle,
        ]}>
        {children}
      </ScrollView>
    );
  }

  /**
   * KeyboardAvoidingView
   */
  if (keyboardAware) {
    content = (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : 'height'
        }>
        {content}
      </KeyboardAvoidingView>
    );
  }

  /**
   * Gradient Screen
   */
  if (gradientColors?.length) {
    return (
      <>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={barStyle}
        />

        <LinearGradient
          colors={gradientColors}
          style={{ flex: 1 }}>
          <SafeAreaView
            edges={edges}
            style={[
              {
                flex: 1,
                backgroundColor: 'transparent',
              },
              style,
            ]}>
            {content}
          </SafeAreaView>
        </LinearGradient>
      </>
    );
  }

  /**
   * Solid Background Screen
   */
  return (
    <>
      <StatusBar
        backgroundColor={bgColor}
        barStyle={barStyle}
      />

      <SafeAreaView
        edges={edges}
        style={[
          {
            flex: 1,
            backgroundColor: bgColor,
          },
          style,
        ]}>
        {content}
      </SafeAreaView>
    </>
  );
}





// Usage Examples
// Normal Screen
// <Screen>
//   <HomeScreen />
// </Screen>
// Scroll Screen
// <Screen scrollable>
//   <CandidateList />
// </Screen>
// Login Screen
// <Screen
//   scrollable
//   keyboardAware>
//   <LoginForm />
// </Screen>
// Login Form With Padding
// <Screen
//   scrollable
//   keyboardAware
//   contentContainerStyle={{
//     padding: 20,
//   }}>
//   <LoginForm />
// </Screen>
// Gradient Screen
// <Screen
//   gradientColors={[
//     '#0A57A5',
//     '#1976D2',
//   ]}>
//   <ProfileHeader />
// </Screen>
// Gradient + Scroll
// <Screen
//   gradientColors={[
//     '#0A57A5',
//     '#1976D2',
//   ]}
//   scrollable>
//   <ProfileContent />
// </Screen>
// Gradient + Keyboard + Scroll
// <Screen
//   gradientColors={[
//     '#0A57A5',
//     '#1976D2',
//   ]}
//   scrollable
//   keyboardAware>
//   <EditProfileForm />
// </Screen>