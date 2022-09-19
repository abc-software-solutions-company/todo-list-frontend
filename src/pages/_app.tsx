import '@/vendors/tailwindcss/style.scss';
import '@/vendors/menu/style.scss';
import '@/vendors/abc-icons/dist/abc.scss';

import {appWithTranslation} from 'next-i18next';
import {DefaultSeo} from 'next-seo';
import type {AppProps} from 'next/app';
import {useRouter} from 'next/router';
import React from 'react';

import AuthProvider from '@/contexts/auth/provider';
import Noop from '@/core-ui/noop';

const CustomApp = ({Component, pageProps}: AppProps) => {
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Layout = (Component as any).Layout || Noop;

  return (
    <AuthProvider>
      <DefaultSeo />
      <Layout pageProps={pageProps}>
        <Component {...pageProps} key={router.route} />
      </Layout>
    </AuthProvider>
  );
};

export default appWithTranslation(CustomApp);
