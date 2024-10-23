import ChatLog from '../ChatLog';
import ChatBox from '../ChatBox';
import { createSignal } from 'solid-js';

import styles from './tabs.module.css';

const Tabs = () => {
  const [activeTab, setActiveTab] = createSignal(0);

  return (
    <div class={styles.tabs}>
      <div class="flex justify-center gap-8 w-full">
        <div class="border-b border-gray-200 w-full">
          <nav class="-mb-px flex w-full" aria-label="Tabs">
            <a href="#" class={activeTab() === 0 ? `${styles.tab} ${styles.active}` : styles.tab} onClick={() => setActiveTab(0)}>Chat</a>
            <a href="#" class={activeTab() === 1 ? `${styles.tab} ${styles.active}` : styles.tab}
               onClick={() => setActiveTab(1)}>Participants</a>
          </nav>
        </div>
      </div>

      {activeTab() === 0 && (
        <>
          <ChatLog />
          <ChatBox />
        </>
      )}

      {activeTab() === 1 && (
        <div>Placeholder</div>
      )}
    </div>
  );
}

export default Tabs;