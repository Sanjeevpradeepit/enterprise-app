import React from 'react';
import { View, Text } from 'react-native';
import { useOTA } from '../../hooks/useOTA';
import { OTAStatus } from '@/platform/ota';


export function OTAIndicator() {
  const status = useOTA();

  if (status === OTAStatus.IDLE) {
    return null;
  }

  return (
    <View>
      <Text>{status}</Text>
    </View>
  );
}