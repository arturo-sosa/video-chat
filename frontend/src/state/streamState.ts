import { atom } from 'nanostores';

export type StreamProps = {
  mediaStream: MediaStream | undefined;
  muted: boolean;
  error?: Error | undefined;
};

export const userStream = atom<StreamProps>({ mediaStream: undefined, muted: false });