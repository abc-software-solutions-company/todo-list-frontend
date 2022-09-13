import '@/vendors/tailwindcss/style.scss';
import '@/vendors/menu/style.scss';
import '@/vendors/abc-icons/dist/abc.scss';

import {isString} from 'lodash-es';
import {appWithTranslation} from 'next-i18next';
import type {AppProps} from 'next/app';
import {useRouter} from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import React, {useEffect, useState} from 'react';

import API from '@/api/network/user';
import QueryProvider from '@/contexts/query.provider';
import {CoreUIProvider, defaultTheme} from '@/core-ui/contexts/index';
import Noop from '@/core-ui/noop';
import {GlobalContext, ThemeContext} from '@/hooks/useAuthContext';

const CustomApp = ({Component, pageProps}: AppProps) => {
  const router = useRouter();
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

  useEffect(() => {
    const userIdSaved = localStorage.getItem('userIdSaved');
    API.checkUserLogin(userIdSaved)
      .then(res => {
        setUser(res.data);
        setResolved(true);
      })
      .catch(() => setResolved(true));
    checkShareLink();
  }, []);

  if (resolved)
    return (
      <QueryProvider pageProps={pageProps}>
        <CoreUIProvider theme={defaultTheme}>
          <NextNProgress color="#448BD1" />
          <Layout pageProps={pageProps}>
            <ThemeContext.Provider value={user}>
              {true && <Component {...pageProps} key={router.route} />}
            </ThemeContext.Provider>
          </Layout>
        </CoreUIProvider>
      </QueryProvider>
    );
};

export default appWithTranslation(CustomApp);
