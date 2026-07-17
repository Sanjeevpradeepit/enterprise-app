import {
  NativeModules,
  Platform,
} from 'react-native';

import type {
  WidgetBridge,
  WidgetData,
} from './widget.types';

const NativeWidget =
  NativeModules.WidgetBridge;

class WidgetBridgeService
  implements WidgetBridge
{
  async updateWidget(
    data: WidgetData,
  ): Promise<void> {
    if (!NativeWidget) {
      console.warn(
        '[Widget] Native module not found.',
      );

      return;
    }

    await NativeWidget.updateWidget(data);
  }

  async reloadWidget(): Promise<void> {
    if (!NativeWidget) {
      return;
    }

    if (Platform.OS === 'ios') {
      await NativeWidget.reloadWidget();
    } else {
      await NativeWidget.refreshWidget();
    }
  }

  async clearWidget(): Promise<void> {
    if (!NativeWidget) {
      return;
    }

    await NativeWidget.clearWidget();
  }
}

export const widgetBridge =
  new WidgetBridgeService();