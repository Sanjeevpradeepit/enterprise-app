export type WebSocketStatus =
  | 'DISCONNECTED'
  | 'CONNECTING'
  | 'CONNECTED'
  | 'RECONNECTING'
  | 'AUTHENTICATING';

export interface WebSocketMessage<T = any> {
  event: string;
  data: T;
  timestamp?: number;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  message: string;
  createdAt: string;
}

export interface NotificationPayload {
  id: string;
  title: string;
  body: string;
  type: string;
}

export interface SystemAlert {
  message: string;
}

export interface JobUpdated {
  jobId: string;
}

export interface ProfileUpdated {
  userId: string;
}

export interface OnlineUsers {
  users: string[];
}