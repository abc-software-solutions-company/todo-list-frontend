import '@/vendors/tailwindcss/style.scss';
import '@/vendors/menu/style.scss';
import '@/vendors/abc-icons/dist/abc.scss';

import {isString} from 'lodash-es';
import {appWithTranslation} from 'next-i18next';
import type {AppProps} from 'next/app';
import {useRouter} from 'next/router';
import NProgress from 'nprogress';
import React, {useEffect, useState} from 'react';
import 'nprogress/nprogress.css';

import API from '@/api/network/user';
import {ROUTES} from '@/configs/routes.config';
import QueryProvider from '@/contexts/query.provider';
import {CoreUIProvider, defaultTheme} from '@/core-ui/contexts/index';
import Noop from '@/core-ui/noop';
import {GlobalContext, ThemeContext} from '@/hooks/useAuthContext';

const CustomApp = ({Component, pageProps}: AppProps) => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState<GlobalContext>({userName: '', createdDate: '', id: ''});
  const Layout = (Component as any).Layout || Noop;
  const [resolved, setResolved] = useState(false);

  const checkShareLink = () => {
    const listIDDetect = router.asPath.split('/')[2];
    if (isString(listIDDetect)) {
      const listID = window.location.href.split('/')[4];
      localStorage.setItem('listID', listID);
    }
  };

  function authCheck(url: string) {
    const userIdSaved = localStorage.getItem('userIdSaved');
    API.checkUserLogin(userIdSaved)
      .then(res => {
        setUser(res.data);
        setResolved(true);
      })
      .catch(() => setResolved(true));
    checkShareLink();

    if (resolved) {
      const currentPath = url.split('?')[0];
      if (user.id === undefined && !['/', '/quick-play'].includes(currentPath)) {
        setVisible(true);
        router.push({pathname: ROUTES.QUICKPLAY});
      } else if (user.id !== undefined && ['/quick-play'].includes(currentPath)) {
        setVisible(true);
        router.push({pathname: ROUTES.ACTION});
      } else {
        setVisible(true);
      }
    }
    NProgress.done();
  }

  useEffect(() => {
    authCheck(router.asPath);
    const hideContent = () => {
      setVisible(false);
      NProgress.start();
    };
    router.events.on('routeChangeStart', hideContent);
    router.events.on('routeChangeComplete', authCheck);
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('hashChangeComplete', authCheck);
    };
  }, []);

  if (resolved)
    return (
      <ThemeContext.Provider value={user}>
        <QueryProvider pageProps={pageProps}>
          <CoreUIProvider theme={defaultTheme}>
            <Layout pageProps={pageProps}>
              {visible && <Component {...pageProps} key={router.route} />}
              {true && <Component {...pageProps} key={router.route} />}
            </Layout>
          </CoreUIProvider>
        </QueryProvider>
      </ThemeContext.Provider>
    );
};

export default appWithTranslation(CustomApp);
