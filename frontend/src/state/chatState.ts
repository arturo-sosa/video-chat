import { atom } from 'nanostores';

export type ChatMessage = {
  id: string,
  sender?: string,
  message: string,
  time: string,
};

export const chatMessages = atom<Array<ChatMessage>>([]);