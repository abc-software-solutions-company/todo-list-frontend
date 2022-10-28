import React from 'react';

import Footer from '@/components/footer';
import TopBarLobby from '@/components/lobby/topbar';

import styles from './style.module.scss';

export default function LobbyLayout({children}: React.PropsWithChildren<Record<string, unknown>>) {
  // useEffect(() => {
  //   if (window !== undefined) {
  //     document.getElementsByTagName('body')[0].classList.add("bg-[url('/image/bg-lobby.png')]");
  //     console.log('render background because scrollbar come from body');
  //   }
  // });
  return (
    <>
      <img className="absolute left-0 top-0 h-full w-full object-cover object-center" src="/image/bg-lobby.png" alt="" />
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
