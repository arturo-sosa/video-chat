import { atom } from 'nanostores';

export type RoomProps = {
  loading: boolean,
  id?: string,
  error?: Error | undefined;
};

export const room = atom<RoomProps>({ loading: true });