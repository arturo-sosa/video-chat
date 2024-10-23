import { useStore } from '@nanostores/solid';
import Peer from 'peerjs';
import { io } from 'socket.io-client';
import { createSignal, onMount } from 'solid-js';

import { clientSocket, peerList } from '../state/peerState';
import useChat from './useChat';
import useRoom from './useRoom';
import useStream from './useStream';

import type { ChatMessage } from '../state/chatState';

// Need the import for typings
type UserProps = {
  id: string,
  peer: string,
  room: string,
};

type MessageProps = {
  id: string,
  sender?: string,
  message: string,
}

const usePeer = () => {
  const { stream, addStream, removeStream } = useStream();
  const { addMessage } = useChat();
  const [peer, setPeer] = createSignal<Peer>();
  const { room } = useRoom();
  const socket = useStore(clientSocket);
  const peers = useStore(peerList);

  onMount(() => {
    clientSocket.set(io(`http://${window.location.hostname}:3000`));
    setSocketConnection();
  });

  const setSocketConnection = () => {
    socket().on('connect', () => {
      setPeerConnection();
    });
    
    socket().on('update-participants', (data: { message: Array<string> }) => {
      peerList.set(data.message);
    });

    socket().on('user-joined', (data: UserProps) => {
      if (data.room !== room().id) return;
      if (peer() === undefined || stream.mediaStream === undefined) return;
      if (peers().includes(data.peer)) return;

      const call = peer().call(data.peer, stream.mediaStream);
      call.on('stream', (callStream) => handleCallStream(callStream, call.peer));
    });

    socket().on('user-leaved', (data: UserProps) => {
      removeStream(data.peer);
    });

    socket().on('receive-message', (data: MessageProps) => {
      const message: ChatMessage = {
        ...data,
        time: (new Date()).toTimeString().substring(0, 5),
      };

      addMessage(message);
    });
  };

  const setPeerConnection = async () => {
    // Need to async import due to a library issue
    const Peer = (await import('peerjs')).default;
    const peer = new Peer(undefined, {
      host: "/",
      port: 3000,
      path: "/peerjs",
    });

    peer.on('open', (peerId: string) => {
      socket().emit('join-room', {
        room: room().id,
        peer: peerId
      });

      handleCallStream(stream, peerId);
    });

    peer.on('call', (call) => {
      call.answer(stream.mediaStream);
      call.on('stream', (callStream) => handleCallStream(callStream, call.peer));
    });

    setPeer(peer);
  };

  const handleCallStream = (peerStream, peerId) => {
    addStream({
      peerId,
      mediaStream: peerStream.mediaStream ?? peerStream,
      muted: peerStream.muted ?? true,
    });
  };
};

export default usePeer;
