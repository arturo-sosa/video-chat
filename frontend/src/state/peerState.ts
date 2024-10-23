import { atom } from 'nanostores';
import { Socket } from 'socket.io-client';

export const clientSocket = atom<Socket>();
export const peerList = atom<Array<string>>([]);