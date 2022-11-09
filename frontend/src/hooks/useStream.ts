import { useStore } from '@nanostores/solid';

import { streams, userStream } from '../state/streamState';

import type { StreamProps } from '../state/streamState';

const useStream = () => {
  const stream = useStore(userStream);
  const availableStreams = useStore(streams);

  const getStream = (newStream: StreamProps) => availableStreams().find(entry => entry.mediaStream.id === newStream.mediaStream.id);

  const addStream = (newStream: StreamProps) => {
    if (newStream.error || newStream.mediaStream === undefined) return;

    if (getStream(newStream) === undefined)
      streams.set([...availableStreams(), newStream]);
  };

  const removeStream = (streamId: string) => {
    const updatedStreams = availableStreams().filter(stream => stream.peerId !== streamId);
    streams.set(updatedStreams);
  }

  return {
    stream: stream(),
    streams: availableStreams(),
    getStream,
    addStream,
    removeStream,
  };
};

export default useStream;