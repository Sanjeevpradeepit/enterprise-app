import messaging from '@react-native-firebase/messaging';

export async function registerDevice(): Promise<string | null> {
  try {
    const token = await messaging().getToken();

    console.log('FCM Token:', token);

    return token;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export function onForegroundMessage(callback: (message: any) => void) {
  return messaging().onMessage(callback);
}

export function onTokenRefresh(callback: (token: string) => void) {
  return messaging().onTokenRefresh(callback);
}
