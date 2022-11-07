import { useStore } from '@nanostores/solid';
import { createEffect, createResource } from 'solid-js';

import { mediaStream } from '../state/streamState';

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
      mediaStream.set({ ...mediaStream.get(), mediaStream: undefined, error: Error(userMedia.error) });
    else if (userMedia())
      mediaStream.set({ ...mediaStream.get(), mediaStream: userMedia(), error: undefined });
  });

  return <>{props.children}</>;
};

export const useStream = () => {
  const stream = useStore(mediaStream);
  return stream();
};