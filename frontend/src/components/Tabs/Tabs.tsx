import { useStore } from '@nanostores/solid';
import { createSignal, For } from "solid-js";

import ChatLog from '../ChatLog';
import ChatBox from '../ChatBox';

import { peerList } from '../../state/peerState';

import styles from './tabs.module.css';

const Tabs = () => {
  const [activeTab, setActiveTab] = createSignal(0);
  const peers = useStore(peerList);

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
        <div class="h-full overflow-auto flex-1 scroll-smooth">
          <div class="flex flex-col overflow-hidden my-2 py-2 px-4">
            <For each={peers()}>
              {
                (peer) => <div class="flex flex-row items-center text-xs text-indigo-500 font-bold">{peer}</div>
              }
            </For>
          </div>
        </div>
      )}
    </div>
  )
    ;
}

export default Tabs;