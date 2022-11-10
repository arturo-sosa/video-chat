import { useStore } from '@nanostores/solid';
import { createEffect, createSignal, For, onMount } from 'solid-js';

import { chatMessages } from '../state/chatState';
import ChatMessage from './ChatMessage/ChatMessage';

const ChatLog = () => {
  const messages = useStore(chatMessages);
  const [forceScroll, setForceScroll] = createSignal(true);
  let logRef: HTMLDivElement;

  onMount(() => {
    logRef.addEventListener('scroll', () => {
      const offsetDiff = logRef.scrollHeight - logRef.clientHeight;
      setForceScroll(logRef.scrollTop === offsetDiff);
    });
  });

  createEffect(() => {
    if (forceScroll() === false) return;

    const messageCount = messages().length - 1;
    const element = logRef.querySelector(`[data-idx="${messageCount}"]`);

    if (element !== null) {
      element.scrollIntoView();
    }
  })

  return (
    <div ref={logRef} class="h-full overflow-auto flex-1">
      <For each={messages()}>
        {
          (message, idx) => <ChatMessage idx={idx()} id={message.id} message={message.message} time={message.time} sender={message.sender} />
        }
      </For>
    </div>
  );
};

export default ChatLog;