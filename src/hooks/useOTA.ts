import { useEffect, useState } from 'react';
import { otaListener, OTAStatus } from '../core/ota';

export function useOTA() {
  const [status, setStatus] = useState(OTAStatus.IDLE);

  useEffect(() => {
    const unsubscribe = otaListener.subscribe(setStatus);

    return unsubscribe;
  }, []);

  return status;
}