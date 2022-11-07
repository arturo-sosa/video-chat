import { createEffect, createSignal, For } from 'solid-js';

import { useStream } from './Stream';
import Video from './Video';

import type { StreamProps } from "../state/streamState";

const VideoGrid = () => {
  const userStream = useStream();
  const [streams, setStreams] = createSignal<Array<StreamProps>>([]);

  const addStream = (newStream: StreamProps) => {
    if (newStream.error || newStream.mediaStream === undefined) return;

    const stream = streams().find(entry => entry.mediaStream.id === newStream.mediaStream.id);

    if (stream === undefined)
      setStreams([...streams(), newStream]);
  };

  createEffect(() => {
    addStream(userStream);
  });

  return (
    <div class="flex justify-center">
      <For each={streams()}>
        {
          (stream) => <Video muted={stream.muted} stream={stream.mediaStream} />
        }
      </For>
    </div>
  );
};

export default VideoGrid;