
export type MessageType = 'text' | 'image' | 'search-result';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type: MessageType;
  imageUrl?: string;
  groundingLinks?: { title: string; uri: string }[];
  timestamp: Date;
}

export enum AppMode {
  CHAT = 'chat',
  STUDIO = 'studio'
}

export interface ImageEditState {
  original: string | null;
  edited: string | null;
  loading: boolean;
  prompt: string;
}
