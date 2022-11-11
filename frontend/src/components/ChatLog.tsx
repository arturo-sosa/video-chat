import { useStore } from '@nanostores/solid';
import { createEffect, createSignal, For, onMount } from 'solid-js';

import { chatMessages } from '../state/chatState';
import ChatMessage from './ChatMessage/ChatMessage';

const ChatLog = () => {
  const messages = useStore(chatMessages);
  const [forceScroll, setForceScroll] = createSignal(true);
  const [lastSeen, setLastSeen] = createSignal(0);
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

    if (element !== null)
      element.scrollIntoView();
    setLastSeen(messageCount);
  })

  return (
    <div ref={logRef} class="h-full overflow-auto flex-1 scroll-smooth">
      <For each={messages()}>
        {
          (message, idx) => <ChatMessage idx={idx()} id={message.id} message={message.message} time={message.time} sender={message.sender} />
        }
      </For>

      {
        forceScroll() === false && messages().length - lastSeen() > 1 &&
        <div class="fixed bottom-0 w-80">
          <button class="inline-flex w-full justify-center items-center border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" type="button" onClick={() => setForceScroll(true)}>Go to last message</button>
        </div>
      }
    </div>
  );
};

export default ChatLog;