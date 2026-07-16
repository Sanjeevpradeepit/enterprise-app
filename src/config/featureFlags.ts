export const FeatureFlags = {
  ENABLE_CHAT: true,

  ENABLE_PUSH_NOTIFICATION: true,

  ENABLE_BIOMETRIC: true,

  ENABLE_ANALYTICS: true,

  ENABLE_CRASH_REPORTING: true,

  ENABLE_OTA: true,

  ENABLE_LOCATION: true,

  ENABLE_GOOGLE_LOGIN: true,

  ENABLE_APPLE_LOGIN: true,

  ENABLE_FACEBOOK_LOGIN: false,

  ENABLE_DARK_MODE: true,
} as const;



// Usage

// if (FeatureFlags.ENABLE_CHAT) {
//   // Navigate to Chat
// }