import { useStore } from '@nanostores/solid';

import { streams, userStream } from '../state/streamState';

import type { StreamProps } from '../state/streamState';

const useStream = () => {
  const stream = useStore(userStream);
  const availableStreams = useStore(streams);

  const getStream = (newStream: StreamProps) => availableStreams().find(entry => entry.mediaStream.id === newStream.mediaStream.id);

  const addStream = (newStream: StreamProps) => {
    console.log('stream', newStream);
    if (newStream.error || newStream.mediaStream === undefined) return;

    if (getStream(newStream) === undefined) {
      console.log('adding stream', newStream.mediaStream.id);
      streams.set([...availableStreams(), newStream]);
    }
  };

  return {
    stream: stream(),
    streams: availableStreams(),
    getStream,
    addStream,
  };
};

export default useStream;