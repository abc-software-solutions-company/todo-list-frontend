import '@/vendors/bootstrap/bootstrap.scss';
import '@/vendors/tailwindcss/style.scss';
import '@/vendors/menu/style.scss';
import '@/vendors/abc-icons/dist/abc.scss';
import 'nprogress/nprogress.css';

import {createTheme, ThemeProvider} from '@mui/material/styles';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import type {AppProps} from 'next/app';
import {useRouter} from 'next/router';
import {appWithTranslation} from 'next-i18next';
import nProgress from 'nprogress';
import {useEffect} from 'react';
import {Provider} from 'react-redux';

import DefaultSeo from '@/components/common/seo/default-seo';
import {AuthProvider} from '@/states/auth';
import {store} from '@/states/store';

const muiTheme = createTheme({
  typography: {
    fontFamily: `Mulish, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`
  }
});

const Noop: React.FC = ({children}: React.PropsWithChildren<any>) => <>{children}</>;

const CustomApp = ({Component, pageProps: {session, ...pageProps}}: AppProps) => {
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
        <Provider store={store}>
          <ThemeProvider theme={muiTheme}>
            <Layout pageProps={pageProps}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Component {...pageProps} key={router.route} />
              </LocalizationProvider>
            </Layout>
          </ThemeProvider>
        </Provider>
      </AuthProvider>
    </>
  );
};

export default appWithTranslation(CustomApp);
