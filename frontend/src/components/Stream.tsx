import { useStore } from '@nanostores/solid';
import { createEffect, createResource } from 'solid-js';

import { StreamProps, streams, userStream } from '../state/streamState';

export const StreamProvider = (props) => {
  const [userMedia] = createResource(
    () => navigator.mediaDevices.getUserMedia(
      {
        video: true,
        audio: true,
      }
    )
  );

  createEffect(() => {
    if (userMedia.loading) return;

    if (userMedia.error)
      userStream.set({ ...userStream.get(), mediaStream: undefined, error: Error(userMedia.error) });
    else if (userMedia())
      userStream.set({ ...userStream.get(), mediaStream: userMedia(), error: undefined });
  });

  return <>{props.children}</>;
};

export const useStream = () => {
  const stream = useStore(userStream);
  const availableStreams = useStore(streams);

  const addStream = (newStream: StreamProps) => {
    if (newStream.error || newStream.mediaStream === undefined) return;

    const stream = availableStreams().find(entry => entry.mediaStream.id === newStream.mediaStream.id);

    if (stream === undefined)
      streams.set([...availableStreams(), newStream]);
  };

  return {
    stream: stream(),
    streams: availableStreams(),
    addStream,
  };
};

export default StreamProvider;