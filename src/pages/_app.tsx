import '@/vendors/tailwindcss/style.scss';
import '@/vendors/menu/style.scss';
import '@/vendors/abc-icons/dist/abc.scss';

import {appWithTranslation} from 'next-i18next';
import type {AppProps} from 'next/app';
import {useRouter} from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import React from 'react';

import AuthProvider from '@/contexts/auth/provider';
import {GlobalProvider} from '@/contexts/global';
import QueryProvider from '@/contexts/query.provider';
import {CoreUIProvider, defaultTheme} from '@/core-ui/contexts/index';
import Noop from '@/core-ui/noop';

import PageWrap from './_app.hook';

const CustomApp = ({Component, pageProps}: AppProps) => {
  const router = useRouter();
  const Layout = (Component as any).Layout || Noop;

  return (
    <AuthProvider>
      <QueryProvider pageProps={pageProps}>
        <GlobalProvider>
          <CoreUIProvider theme={defaultTheme}>
            <NextNProgress color="#4b9ae8" />
            <PageWrap>
              <Layout pageProps={pageProps}>{<Component {...pageProps} key={router.route} />}</Layout>
            </PageWrap>
          </CoreUIProvider>
        </GlobalProvider>
      </QueryProvider>
    </AuthProvider>
  );
};

export default appWithTranslation(CustomApp);
