import '@/vendors/tailwindcss/style.scss';
import '@/vendors/menu/style.scss';
import '@/vendors/abc-icons/dist/abc.scss';

import {createTheme, ThemeProvider} from '@mui/material/styles';
import type {AppProps} from 'next/app';
import {useRouter} from 'next/router';
import {appWithTranslation} from 'next-i18next';
import NextNProgress from 'nextjs-progressbar';
import React from 'react';

import DefaultSeo from '@/components/common/seo/default-seo';
import GoogleTagManager from '@/components/common/third-party/google-analytics/gtag';
import QueryProvider from '@/contexts/query.provider';

const Noop: React.FC = ({children}: React.PropsWithChildren<any>) => <>{children}</>;

const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'system-ui',
      '-apple-system',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'sans-serif'
    ].join(',')
  },
  shape: {
    borderRadius: 2
  },
  components: {
    MuiInput: {
      styleOverrides: {
        root: {
          '&.MuiInputBase-input': {
            backgroundColor: '#000',
            color: '#fff'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '44rem'
        }
      }
    }
  }
});

const CustomApp = ({Component, pageProps}: AppProps) => {
  const router = useRouter();

  const Layout = (Component as any).Layout || Noop;

  return (
    <QueryProvider pageProps={pageProps}>
      <DefaultSeo />
      <NextNProgress color="#3D99D3" />
      <GoogleTagManager />
      <ThemeProvider theme={theme}>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} key={router.route} />
        </Layout>
      </ThemeProvider>
    </QueryProvider>
  );
};

export default appWithTranslation(CustomApp);
