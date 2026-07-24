import { otaListener, OTAStatus } from '@/platform/ota';
import { useEffect, useState } from 'react';

export function useOTA() {
  const [status, setStatus] = useState(OTAStatus.IDLE);

  useEffect(() => {
    const unsubscribe = otaListener.subscribe(setStatus);

    return unsubscribe;
  }, []);

  return status;
}