import styles from './chatMessage.module.css';

import type { ChatMessage } from "../../state/chatState";
import { createSignal, onMount } from 'solid-js';
const ChatMessage = (props: ChatMessage) => {
  const { sender, time, message } = props;
  const [isVisible, setVisible] = createSignal(false);

  onMount(() => {
    setTimeout(() => {
      setVisible(true);
    }, 100);
  });

  return (
    <div class={styles.message}>
      <div classList={{ 'opacity-100': isVisible() }} class={`${styles.group} opacity-0`}>
        <div class={sender === undefined ? styles.serverHeader : styles.userHeader}>
          {sender === undefined && <span class={styles.serverMessage}>{message}</span>}
          {sender !== undefined && <span>User</span>}
          {sender !== undefined && <span class={styles.time}>{time}</span>}
        </div>

        {
          sender !== undefined &&
          <div class={styles.messageContent}>{message}</div>
        }
      </div>
    </div>
  );
};

export default ChatMessage;