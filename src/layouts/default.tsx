import {useRouter} from 'next/router';
import React from 'react';

import Footer from '@/components/footer';
import Topbar from '@/components/topbar';

import styles from './style.module.scss';

export default function DefaultLayout({children}: React.PropsWithChildren<Record<string, unknown>>) {
  const router = useRouter();
  return (
    <div className={styles['layout-default']}>
      <Topbar />
      <main>{children}</main>
      {router.asPath !== ROUTES.LOGIN && <Footer />}
    </div>
  );
}
