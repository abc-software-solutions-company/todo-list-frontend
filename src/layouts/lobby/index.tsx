import React, {useEffect} from 'react';

import Footer from '@/components/footer';
import TopBarLobby from '@/components/lobby/topbar';

import styles from './style.module.scss';

export default function LobbyLayout({children}: React.PropsWithChildren<Record<string, unknown>>) {
  useEffect(() => {
    if (window !== undefined) {
      document.getElementsByTagName('body')[0].classList.add("bg-[url('/image/bg-lobby.png')]", 'bg-cover', 'bg-center');
    }
  });
  return (
    <>
      <div className={styles['layout-lobby']}>
        <TopBarLobby />
        <main>{children}</main>
        <div className="bg-transparent">
          <Footer />
        </div>
      </div>
    </>
  );
}
