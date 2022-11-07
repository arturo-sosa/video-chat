import { Accessor, createContext, createResource, createSignal, Resource, useContext } from 'solid-js';
import { createStore } from "solid-js/store";

interface StreamState {
  userMedia: Resource<MediaStream>;
}

const StreamContext = createContext<StreamState>();

export const StreamProvider = (props) => {
  const [userMedia] = createResource(
    () => navigator.mediaDevices.getUserMedia(
      {
        video: true,
        audio: true,
      }
    )
  );

  const [state] = createStore({ userMedia });

  return (
    <StreamContext.Provider value={state}>
      {props.children}
    </StreamContext.Provider>
  );
};

export const useStream = () => useContext(StreamContext);