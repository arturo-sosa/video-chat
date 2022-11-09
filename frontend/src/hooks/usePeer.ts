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
  const { stream, addStream, removeStream } = useStream();
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

      const call = peer().call(data.peer, stream.mediaStream);
      call.on('stream', (callStream) => handleCallStream(callStream, call.peer));
      setPeerUsers([...peerUsers(), data.peer]);
    });

    socket().on('user-leaved', (data: UserProps) => {
      const updatedPeers = peerUsers().filter(user => user !== data.peer);

      removeStream(data.peer);
      setPeerUsers(updatedPeers);
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