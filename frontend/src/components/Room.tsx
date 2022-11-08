import 'solid-js';
import { createEffect, createResource, createSignal } from 'solid-js';
import { useStream } from './Stream';
import io from 'socket.io-client';
import useRoom from '../state/roomState';

// Need the import for typings
import Peer from 'peerjs';

type UserProps = {
  id: string,
  peer: string,
  room: string,
}

const Room = () => {
  const { stream, addStream } = useStream();
  const roomState = useRoom();
  const [isConnected, setConnected] = createSignal(false);
  const [socket] = createSignal(io("http://localhost:3000"));
  const [peer, setPeer] = createSignal<Peer>();

  createEffect(async () => {
    if (isConnected() === false) return;

    // Need to async import due to a library issue
    const Peer = (await import('peerjs')).default;
    setPeer(new Peer(undefined, {
      host: "/",
      port: 3000,
      path: "/peerjs",
    })
    );
  });

  const handleCallStream = (peerStream) => {
    console.log('adding stream');
    addStream({
      mediaStream: peerStream,
      muted: true,
    });
  };

  createEffect(() => {
    if (peer() === undefined) return;

    peer().on('open', (peerId: string) => {
      socket().emit('join-room', {
        room: roomState().id,
        peer: peerId
      });

      addStream(stream);
    });

    peer().on('call', (call) => {
      call.answer(stream.mediaStream);
      call.on('stream', handleCallStream);
    });
  });

  createEffect(() => {
    if (socket() === undefined) return;

    socket().on('connect', () => {
      setConnected(true);
    });

    socket().on('disconnect', () => {
      setConnected(false);
    });

    socket().on('user-joined', (data: UserProps) => {
      if (peer() === undefined || stream.mediaStream === undefined) return;

      const call = peer().call(data.peer, stream.mediaStream);
      call.on('stream', handleCallStream);
    })
  })

  return <div class="h-8 flex">
    <div>
    {
        roomState().loading
        ? <div>Waiting for room</div>
          : <div>{`Room ${roomState().id}`}</div>
    }
    </div>

    <div class="flex flex-row">
      <span class="mx-2">-</span>
      {stream.error && <div class="text-red-500">No device</div>}
      {stream.mediaStream && <div>Camera</div>}
    </div>
  </div>;
};

export default Room;