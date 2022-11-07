import 'solid-js';
import { createEffect, createResource, createSignal } from 'solid-js';
import { useStream } from './Stream';
import io from 'socket.io-client';
import useRoom from '../state/roomState';

const Room = () => {
  const userStream = useStream();
  const roomState = useRoom();
  const [isConnected, setConnected] = createSignal(false);
  const [socket] = createSignal(io("http://localhost:3000"));

  socket().on('connect', () => {
    setConnected(true);
  });

  socket().on('disconnect', () => {
    console.log('disconnected');
    setConnected(false);
  });

  createEffect(() => {
    if (isConnected() === false) return;

    socket().emit('hello', 'moooo');
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
      {userStream.error && <div class="text-red-500">No device</div>}
      {userStream.mediaStream && <div>Camera</div>}
    </div>
  </div>;
};

export default Room;