import { widgetBridge } from './widget.bridge';
import type { WidgetData } from './widget.types';

/**
 * Enterprise Widget Service
 *
 * Responsible for:
 * - Updating Home Screen Widget
 * - Clearing Widget
 * - Reloading Widget
 * - Formatting data
 */
class WidgetService {
  async initialize() {
    console.log(
      '[Widget] Initialized',
    );
  }

  async update(
    data: WidgetData,
  ): Promise<void> {
    try {
      await widgetBridge.updateWidget(
        data,
      );

      console.log(
        '[Widget] Updated',
        data,
      );
    } catch (error) {
      console.error(
        '[Widget] Update Failed',
        error,
      );
    }
  }

  async reload() {
    try {
      await widgetBridge.reloadWidget();
    } catch (error) {
      console.error(error);
    }
  }

  async clear() {
    try {
      await widgetBridge.clearWidget();
    } catch (error) {
      console.error(error);
    }
  }
}

export const widgetService =
  new WidgetService();