import React from 'react';
import { icons } from './icons';
import type { AppIconProps } from './types';

export function Icon({
  name,
  size = 24,
  color = '#000',
  strokeWidth = 2,
  ...props
}: AppIconProps) {
  const LucideIcon = icons[name];

  return (
    <LucideIcon
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
}