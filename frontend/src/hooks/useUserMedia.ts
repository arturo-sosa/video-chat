import { createResource, onMount } from 'solid-js';

import { userStream } from '../state/streamState';

const useUserMedia = () => {
  const [userMedia] = createResource(
    async () => {
      const media = await navigator.mediaDevices.getUserMedia(
        {
          video: true,
          audio: true,
        }
      );

      userStream.set({ ...userStream.get(), mediaStream: media, error: undefined });
      return media;
    }
  );

  onMount(() => {
    userStream.set({ mediaStream: undefined, muted: true });
  });

  return { userMedia };
};

export default useUserMedia;