import '@/vendors/bootstrap/bootstrap.scss';
import '@/vendors/tailwindcss/style.scss';
import '@/vendors/menu/style.scss';
import '@/vendors/abc-icons/dist/abc.scss';
import 'nprogress/nprogress.css';

import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import type {AppProps} from 'next/app';
import {useRouter} from 'next/router';
import {Provider} from 'react-redux';

import ErrorBoundary from '@/components/common/error-boundary';
import MuiThemeProvider from '@/components/common/mui-theme-provider';
import NProgres from '@/components/common/nprogress';
import DefaultSeo from '@/components/common/seo/default-seo';
import {AuthProvider} from '@/states/auth';
import {store} from '@/states/store';

const Noop: React.FC = ({children}: React.PropsWithChildren<any>) => <>{children}</>;

const CustomApp = ({Component, pageProps: {session, ...pageProps}}: AppProps) => {
  const router = useRouter();

  const Layout = (Component as any).Layout || Noop;

  return (
    <ErrorBoundary>
      <NProgres>
        <DefaultSeo />
        <AuthProvider>
          <Provider store={store}>
            <MuiThemeProvider>
              <Layout pageProps={pageProps}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Component {...pageProps} key={router.route} />
                </LocalizationProvider>
              </Layout>
            </MuiThemeProvider>
          </Provider>
        </AuthProvider>
      </NProgres>
    </ErrorBoundary>
  );
};

export default CustomApp;
