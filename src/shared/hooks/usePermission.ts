import { useState } from 'react';
import { permissionService } from '@/platform/notification';

export function usePermission() {
  const [granted, setGranted] = useState(false);

  const requestNotifications = async () => {
    const result = await permissionService.requestPermission();

    setGranted(result);

    return result;
  };

  return {
    granted,
    requestNotifications,
  };
}

// Usage

// const { requestNotifications } =
//   usePermission();

// await requestNotifications();