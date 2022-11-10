import { useStore } from '@nanostores/solid';
import { For } from 'solid-js';

import { chatMessages } from '../state/chatState';
import ChatMessage from './ChatMessage/ChatMessage';

const ChatLog = () => {
  const messages = useStore(chatMessages);

  return (
    <div>
      <For each={messages()}>
        {
          (message) => <ChatMessage id={message.id} message={message.message} time={message.time} sender={message.sender} />
        }
      </For>
    </div>
  );
};

export default ChatLog;