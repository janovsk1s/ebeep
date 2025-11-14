import { Room, MatrixEvent, MatrixClient } from 'matrix-js-sdk';

export interface ConversationItem {
  roomId: string;
  name: string;
  lastMessage: string;
  timestamp: number;
  unreadCount: number;
}

export interface MessageItem {
  eventId: string;
  sender: string;
  senderName: string;
  content: string;
  timestamp: number;
}

export interface MatrixContextType {
  client: MatrixClient | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  login: (homeserver: string, username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface UIUpdateBatcher {
  schedule: (callback: () => void) => void;
  flush: () => void;
}
