export interface NetworkState {
  isConnected: boolean;

  isInternetReachable: boolean;

  type: string;
}

export interface QueuedRequest {
  id: string;

  url: string;

  method: string;

  data?: unknown;

  headers?: Record<string, string>;
}