import 'solid-js';
import { onMount } from 'solid-js';

type VideoProps = {
  stream: MediaStream;
  muted: boolean;
  peer: string | undefined;
};

const Video = (props: VideoProps) => {
  let videoRef: HTMLVideoElement;

  onMount(() => {
    videoRef.srcObject = props.stream;
    videoRef.muted = props.muted;
    videoRef.play();
  })

  return <video data-peer={props.peer} ref={videoRef} class="bg-black h-60 w-80" />;
};

export default Video;