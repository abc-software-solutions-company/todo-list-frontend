import '@/vendors/bootstrap/bootstrap.scss';
import '@/vendors/tailwindcss/style.scss';
import '@/vendors/menu/style.scss';
import '@/vendors/abc-icons/dist/abc.scss';
import 'nprogress/nprogress.css';

import type {AppProps} from 'next/app';
import {useRouter} from 'next/router';
import {appWithTranslation} from 'next-i18next';
import nProgress from 'nprogress';
import {useEffect} from 'react';

import DefaultSeo from '@/components/seo/default-seo';
import {initFirebase} from '@/lib/firebase/initFirebase';
import {AuthProvider} from '@/states/auth';

const Noop: React.FC = ({children}: React.PropsWithChildren<any>) => <>{children}</>;

const CustomApp = ({Component, pageProps: {session, ...pageProps}}: AppProps) => {
  initFirebase();

  const router = useRouter();

  const Layout = (Component as any).Layout || Noop;
  nProgress.configure({
    minimum: 0.3,
    easing: 'ease',
    speed: 800,
    showSpinner: true
  });

  useEffect(() => {
    const progress = () => {
      nProgress.start();
    };
    const doneProgress = () => {
      nProgress.done();
    };
    router.events.on('routeChangeStart', progress);
    router.events.on('routeChangeComplete', doneProgress);
    router.events.on('routeChangeError', doneProgress);
    return () => {
      router.events.off('routeChangeStart', progress);
      router.events.off('routeChangeComplete', doneProgress);
      router.events.off('routeChangeError', doneProgress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <DefaultSeo />
      <AuthProvider>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} key={router.route} />
        </Layout>
      </AuthProvider>
    </>
  );
};

export default appWithTranslation(CustomApp);
