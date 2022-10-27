import React from 'react';

import Footer from '@/components/footer';
import TopBarLobby from '@/components/lobby/topbar';

import styles from './style.module.scss';

export default function LobbyLayout({children}: React.PropsWithChildren<Record<string, unknown>>) {
  return (
    <div className={styles['layout-lobby']}>
      <TopBarLobby />
      <main>{children}</main>
      <div className="bg-transparent">
        <Footer />
      </div>
    </div>
  );
}
