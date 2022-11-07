import 'solid-js';
import { createEffect, createResource, createSignal } from 'solid-js';

const Room = () => {
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

  return <div>Hello from solid</div>;
};

export default Room;