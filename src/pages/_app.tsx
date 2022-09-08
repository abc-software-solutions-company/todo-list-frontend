import '@/vendors/tailwindcss/style.scss';
import '@/vendors/menu/style.scss';
import '@/vendors/abc-icons/dist/abc.scss';

import {isString} from 'lodash-es';
import {appWithTranslation} from 'next-i18next';
import type {AppProps} from 'next/app';
import {useRouter} from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import React, {useEffect, useState} from 'react';

import {ROUTES} from '@/configs/routes.config';
import QueryProvider from '@/contexts/query.provider';
import {CoreUIProvider, defaultTheme} from '@/core-ui/contexts/index';
import Noop from '@/core-ui/noop';

const CustomApp = ({Component, pageProps}: AppProps) => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const Layout = (Component as any).Layout || Noop;

  function authCheck(url: string) {
    const userJson = localStorage.getItem('user');
    const user = JSON.parse(userJson || '{}');

    const currentPath = url.split('?')[0];
    const listIDDetect = url.split('/')[2];

    if (isString(listIDDetect)) {
      setVisible(true);
      const listID = parseInt(window.location.href.split('/')[4]);
      localStorage.setItem('listID', JSON.stringify(listID));
    }

    if (!user.id && !['/', '/quick-play'].includes(currentPath)) {
      setVisible(true);
      router.push({pathname: ROUTES.QUICKPLAY});
    } else if (user.id && ['/quick-play'].includes(currentPath)) {
      setVisible(true);
      router.push({pathname: ROUTES.ACTION});
    } else {
      setVisible(true);
    }
  }

  useEffect(() => {
    authCheck(router.asPath);

    const hideContent = () => setVisible(false);

    router.events.on('routeChangeStart', hideContent);
    router.events.on('routeChangeComplete', authCheck);
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QueryProvider pageProps={pageProps}>
      <CoreUIProvider theme={defaultTheme}>
        <NextNProgress color="#448BD1" />
        <Layout pageProps={pageProps}>{visible && <Component {...pageProps} key={router.route} />}</Layout>
      </CoreUIProvider>
    </QueryProvider>
  );
};

export default appWithTranslation(CustomApp);
