import 'solid-js';
import { createEffect, createResource } from 'solid-js';
import { useStream } from './Stream';

const Room = () => {
  const stream = useStream();
  const [room] = createResource(async () => {
    const params = new URLSearchParams(window.location.search);
    const roomId = params.get('room');
    const roomPrefix = roomId ? `room/${roomId}` : "room";
    const request = await fetch(`http://localhost:3000/${roomPrefix}`);
    const response = await request.json();

    return response;
  });

  const updateRoomQuery = () => {
    if (!room.loading && !room.error) {
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const params = new URLSearchParams(window.location.search);
      params.set('room', room().id);

      const newState = `${baseUrl}?${params}`;
      window.history.pushState({ path: newState }, '', newState);
    }
  };

  createEffect(updateRoomQuery);

  return <div class="h-8 flex">
    <div>
    {
      room.loading
        ? <div>Waiting for room</div>
        : <div>{`Room ${room().id}`}</div>
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