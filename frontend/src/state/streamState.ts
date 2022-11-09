import { atom } from 'nanostores';

export type StreamProps = {
  mediaStream: MediaStream | undefined;
  muted: boolean;
  peerId?: string;
  error?: Error | undefined;
};

export const userStream = atom<StreamProps>({ mediaStream: undefined, muted: false });

export const streams = atom<Array<StreamProps>>([]);