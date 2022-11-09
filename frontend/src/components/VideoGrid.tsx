import { For } from 'solid-js';

import useStream from '../hooks/useStream';
import Video from './Video';

const VideoGrid = () => {
  const { streams } = useStream();

  return (
    <div class="flex justify-center">
      <For each={streams}>
        {
          (stream) => <Video muted={stream.muted} stream={stream.mediaStream} />
        }
      </For>
    </div>
  );
};

export default VideoGrid;