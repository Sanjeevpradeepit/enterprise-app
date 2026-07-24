import { analyticsService } from './analytics.service';
import { AnalyticsEvents } from './events';

export async function trackScreen(
  screen: string,
) {
  await analyticsService.track(
    AnalyticsEvents.SCREEN_VIEW,
    {
      screen,
    },
  );
}