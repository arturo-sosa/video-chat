import { atom } from 'nanostores';

type StreamState = {
  mediaStream: MediaStream | undefined;
  error?: Error | undefined;
};
export const mediaStream = atom<StreamState>({ mediaStream: undefined });