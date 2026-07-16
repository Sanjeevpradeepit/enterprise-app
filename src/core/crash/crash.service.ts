export interface CrashAttributes {
  [key: string]: unknown;
}

class CrashService {
  initialize() {
    console.log('[Crash] Initialized');
  }

  identify(userId: string) {
    console.log('[Crash] User:', userId);
  }

  setAttributes(attributes: CrashAttributes) {
    console.log('[Crash] Attributes:', attributes);
  }

  captureException(error: unknown) {
    console.error('[Crash]', error);
  }

  captureMessage(message: string) {
    console.log('[Crash]', message);
  }
}

export const crashService = new CrashService();