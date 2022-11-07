import 'solid-js';
import { createEffect, onMount } from 'solid-js';
import { useStream } from './Stream';

const Video = (props) => {
  const state = useStream();
  const video: HTMLVideoElement = <video /> as HTMLVideoElement;

  onMount(() => {
    if (state === undefined) return;
    const stream = state.userMedia;

    if (stream) {
      video.srcObject = stream();
      video.muted = props.muted ?? false;
    }
  });

  return video;
};

export default Video;