import { useState } from 'react';
import { requestNotificationPermission } from '../core/notification';


export function usePermission() {
  const [granted, setGranted] =
    useState(false);

  const requestNotifications = async () => {
    const result =
      await requestNotificationPermission();

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