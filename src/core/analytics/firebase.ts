class FirebaseAnalytics {
  initialize() {
    console.log('Firebase Analytics Initialized');
  }

  async logEvent(
    name: string,
    params?: Record<string, any>,
  ) {
    console.log('Analytics Event', name, params);

    // await analytics().logEvent(name, params);
  }

  async setUserId(userId: string) {
    console.log('Analytics User', userId);

    // await analytics().setUserId(userId);
  }

  async setUserProperty(
    key: string,
    value: string,
  ) {
    console.log(key, value);

    // await analytics().setUserProperty(key, value);
  }
}

export const firebaseAnalytics =
  new FirebaseAnalytics();