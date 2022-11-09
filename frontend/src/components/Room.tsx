import 'solid-js';
import { createEffect, onMount } from 'solid-js';
import usePeer from '../hooks/usePeer';

import useRoom from '../hooks/useRoom';
import useUserMedia from '../hooks/useUserMedia';

const Room = () => {
  const { userMedia } = useUserMedia();
  const { room } = useRoom();

  createEffect(() => {
    if (userMedia.loading) return;

    usePeer();
  });

  return <div class="h-8 flex">
    <div>
      {
        room().loading
          ? <div>Waiting for room</div>
          : <div>{`Room ${room().id}`}</div>
      }
    </div>

    <div class="flex flex-row">
      <span class="mx-2">-</span>
      {
        (userMedia.error || userMedia() === undefined)
        && <div class="text-red-500">No device</div>
      }

      {userMedia() && <div>Camera</div>}
    </div>
  </div>;
};

export default Room;