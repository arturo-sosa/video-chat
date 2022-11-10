import { useStore } from '@nanostores/solid';
import { chatMessages } from '../state/chatState';
import { clientSocket } from '../state/peerState';

import type { ChatMessage } from '../state/chatState';

const useChat = () => {
  const socket = useStore(clientSocket);
  const messages = useStore(chatMessages);

  const sendMessage = (message: string) => {
    socket().emit('send-message', message);
  };

  const addMessage = (message: ChatMessage) => {
    chatMessages.set([...messages(), message]);
  };

  return {
    sendMessage,
    addMessage,
  };
};

export default useChat;