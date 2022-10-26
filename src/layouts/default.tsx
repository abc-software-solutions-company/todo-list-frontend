import {useRouter} from 'next/router';
import React from 'react';

import Footer from '@/components/footer';
import Topbar from '@/components/topbar';
import {ROUTES} from '@/configs/routes.config';

import styles from './style.module.scss';

export default function DefaultLayout({children}: React.PropsWithChildren<Record<string, unknown>>) {
  const router = useRouter();
  return (
    <div className={styles['layout-default']}>
      <Topbar />
      <main>{children}</main>
      {router.asPath === ROUTES.LOGIN ? (
        <>
          <div className="lg:bg-slate-200">
            <Footer />
          </div>
        </>
      ) : (
        <Footer />
      )}
    </div>
  );
}
