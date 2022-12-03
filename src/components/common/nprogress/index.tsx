import {useRouter} from 'next/router';
import nProgress from 'nprogress';
import {ReactNode, useEffect} from 'react';

interface INProgresProps {
  children: ReactNode;
}

const NProgres = ({children}: INProgresProps) => {
  const router = useRouter();

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
  }, []);
  return <>{children}</>;
};

export default NProgres;
