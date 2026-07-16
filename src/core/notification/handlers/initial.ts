import { firebaseService } from '../firebase';
import { handleOpened } from './opened';

export async function handleInitial() {
  const message =
    await firebaseService.getInitialNotification();

  if (!message) {
    return;
  }

  await handleOpened(message);
}