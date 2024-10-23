import { For } from 'solid-js';

import useStream from '../hooks/useStream';
import Video from './Video';

const VideoGrid = () => {
  const { streams } = useStream();

  return (
    <div class="flex w-full justify-center gap-4 flex-wrap">
      <For each={streams}>
        {
          (stream) => <Video peer={stream.peerId} muted={stream.muted} stream={stream.mediaStream} />
        }
      </For>
    </div>
  );
};

export default VideoGrid;