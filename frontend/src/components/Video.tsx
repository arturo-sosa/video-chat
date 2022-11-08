import 'solid-js';
import { createEffect } from 'solid-js';

type VideoProps = {
  stream: MediaStream;
  muted: boolean;
};

const Video = (props: VideoProps) => {
  const video: HTMLVideoElement = <video class="bg-black h-60 w-80" /> as HTMLVideoElement;

  createEffect(() => {
    video.srcObject = props.stream;
    video.muted = props.muted;
    video.play();
  });

  return video;
};

export default Video;