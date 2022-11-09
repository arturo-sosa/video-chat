// Need the import for typings
import Peer from 'peerjs';
import { io } from 'socket.io-client';
import { createSignal, onMount } from 'solid-js';

import useRoom from './useRoom';
import useStream from './useStream';

type UserProps = {
  id: string,
  peer: string,
  room: string,
};

const usePeer = () => {
  const { stream, addStream } = useStream();
  const [socket] = createSignal(io("http://localhost:3000"));
  const [peer, setPeer] = createSignal<Peer>();
  const [peerUsers, setPeerUsers] = createSignal<Array<string>>([]);
  const { room } = useRoom();

  onMount(() => {
    setSocketConnection();
  });

  const setSocketConnection = () => {
    socket().on('connect', () => {
      setPeerConnection();
    });

    socket().on('user-joined', (data: UserProps) => {
      if (peer() === undefined || stream.mediaStream === undefined) return;
      if (peerUsers().includes(data.peer)) return;

      console.log('joined-room', data.peer);

      const call = peer().call(data.peer, stream.mediaStream);
      call.on('stream', handleCallStream);
      setPeerUsers([...peerUsers(), data.peer]);
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

      handleCallStream(stream);
    });

    peer.on('call', (call) => {
      call.answer(stream.mediaStream);
      call.on('stream', handleCallStream);
    });

    setPeer(peer);
  };

  const handleCallStream = (peerStream) => {
    addStream({
      mediaStream: peerStream.mediaStream ?? peerStream,
      muted: peerStream.muted ?? true,
    });
  };
};

export default usePeer;