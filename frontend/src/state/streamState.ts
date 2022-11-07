import { atom } from 'nanostores';

type StreamState = {
  mediaStream: MediaStream | undefined;
};
export const mediaStream = atom<StreamState>({ mediaStream: undefined });