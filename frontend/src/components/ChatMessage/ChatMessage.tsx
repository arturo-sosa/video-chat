import { onMount } from 'solid-js';

import styles from './chatMessage.module.css';

import type { ChatMessage } from "../../state/chatState";

const ChatMessage = (props: ChatMessage & { idx: number; }) => {
  const { sender, time, message } = props;
  let groupRef;

  onMount(() => {
    setTimeout(() => {
      groupRef.classList.remove('opacity-0');
      groupRef.classList.remove('translate-y-4');
    }, 100);
  });

  return (
    <div class={styles.message} data-idx={props.idx}>
      <div ref={groupRef} class={`${styles.group} opacity-0 translate-y-4`}>
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