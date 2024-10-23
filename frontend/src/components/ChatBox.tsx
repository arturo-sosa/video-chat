import { useStore } from '@nanostores/solid';
import { createSignal } from 'solid-js';

import { chatMessages } from '../state/chatState';
import useChat from '../hooks/useChat';

const ChatBox = () => {
  const messages = useStore(chatMessages);
  const [message, setMessage] = createSignal('');
  const { sendMessage } = useChat();

  const handleChange = (ev: Event) => {
    setMessage((ev.target as HTMLTextAreaElement).value);
  };

  const handleClick = () => {
    sendMessage(message());
    setMessage('');
  };

  return (
    <div class="overflow-auto scroll-smooth flex flex-col">
      <textarea onInput={handleChange} value={message()} class="resize-none mx-4 my-2 rounded-md"></textarea>
      <button onClick={handleClick} class="mx-4 mt-0 mb-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none justify-center">Send</button>
    </div>
  );
};

export default ChatBox;