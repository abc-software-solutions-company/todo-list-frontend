import React from 'react';

import TopBarLobby from '@/components/lobby/topbar';

import styles from './style.module.scss';

export default function LobbyLayout({children}: React.PropsWithChildren<Record<string, unknown>>) {
  return (
    <div className={styles['layout-lobby']}>
      <TopBarLobby />
      <main>{children}</main>
    </div>
  );
}
