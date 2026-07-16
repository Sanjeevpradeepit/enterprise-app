import { AppState } from 'react-native';

import { permissionService } from '../permissions';

class PermissionListener {
  private subscription:
    | ReturnType<
        typeof AppState.addEventListener
      >
    | null = null;

  register() {
    this.subscription =
      AppState.addEventListener(
        'change',
        async state => {
          if (state !== 'active') {
            return;
          }

          const granted =
            await permissionService.hasForegroundPermission();

          console.log(
            '[Location Permission]',
            granted,
          );

          /**
           * TODO
           *
           * Restart tracking
           * Update UI
           * Notify user
           */
        },
      );
  }

  unregister() {
    this.subscription?.remove();

    this.subscription = null;
  }
}

export const permissionListener =
  new PermissionListener();