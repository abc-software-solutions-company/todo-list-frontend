import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {ROUTES} from '@/configs/routes.config';

import styles from './style.module.scss';
import TopBarHoa from '@/components/topbar-hoa';
import Sidebar from '@/components/sidebar-intern/Sidebar';

export default function InternLayout({children}: React.PropsWithChildren<Record<string, unknown>>) {
  useEffect(() => {
    if (window !== undefined) {
      document
        .getElementsByTagName('body')[0]
        .classList.remove("bg-[url('/image/bg-lobby-mobile.png')]", "sm:bg-[url('/image/bg-lobby.png')]");

      document.getElementsByTagName('body')[0].removeAttribute('style');
    }
  });

  return (
    <div className={styles['project-layout']}>
      <Sidebar />
      <main className="flex flex-col border-l border-gray-500">
        <TopBarHoa />
        <div className=" py-12 px-6">{children}</div>
      </main>
    </div>
  );
}
