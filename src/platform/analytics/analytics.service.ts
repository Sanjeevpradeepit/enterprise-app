import { firebaseAnalytics } from './firebase';

class AnalyticsService {
  initialize() {
    firebaseAnalytics.initialize();
  }

  async track(
    event: string,
    params?: Record<string, any>,
  ) {
    await firebaseAnalytics.logEvent(event, params);
  }

  async identify(userId: string) {
    await firebaseAnalytics.setUserId(userId);
  }

  async setProperty(
    key: string,
    value: string,
  ) {
    await firebaseAnalytics.setUserProperty(
      key,
      value,
    );
  }
}

export const analyticsService =
  new AnalyticsService();