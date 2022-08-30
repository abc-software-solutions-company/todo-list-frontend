import React from 'react';

import Footer from '@/components/footer';

import styles from './style.module.scss';

export default function DefaultLayout({children}: React.PropsWithChildren<Record<string, unknown>>) {
  return (
    <div className={styles['layout-default']}>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
