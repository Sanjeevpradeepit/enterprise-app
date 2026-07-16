import { TextStyle } from 'react-native';

export const typography = {
  h1: {
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 42,
  } satisfies TextStyle,

  h2: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
  } satisfies TextStyle,

  h3: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  } satisfies TextStyle,

  h4: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  } satisfies TextStyle,

  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  } satisfies TextStyle,

  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  } satisfies TextStyle,

  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
  } satisfies TextStyle,

  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  } satisfies TextStyle,

  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  } satisfies TextStyle,
};

export type Typography = typeof typography;