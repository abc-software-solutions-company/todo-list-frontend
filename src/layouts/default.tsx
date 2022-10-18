import React from 'react';

import Footer from '@/components/common/footer';
import Topbar from '@/components/common/topbar';

import styles from './style.module.scss';

export default function DefaultLayout({children}: React.PropsWithChildren<Record<string, unknown>>) {
  return (
    <div className={styles['layout-default']}>
      <Topbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
