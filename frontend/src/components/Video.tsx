import 'solid-js';
import { createEffect } from 'solid-js';
import { useStream } from './Stream';

const Video = (props) => {
  const stream = useStream();
  const video: HTMLVideoElement = <video class="w-auto inline-block bg-black" /> as HTMLVideoElement;

  createEffect(() => {
    if (stream.mediaStream === undefined) return;

    video.srcObject = stream.mediaStream;
    video.muted = props.muted ?? false;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });
  });

  return video;
};

export default Video;