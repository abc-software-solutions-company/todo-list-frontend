import {useRouter} from 'next/router';
import nProgress from 'nprogress';
import {ReactNode, useEffect} from 'react';
import useSWR from 'swr';

interface INProgresProps {
  children: ReactNode;
}

const fetcher = (url: RequestInfo | URL) => fetch(url).then(res => res.json());
const apiRoute = `${process.env.NEXT_PUBLIC_SITE_URL}/api/server-build-id`;

const NProgres = ({children}: INProgresProps) => {
  const {data} = useSWR(`${apiRoute}`, fetcher);
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
      if (data) {
        const serverBuildID = data.serverBuildID;
        const clientBuildID = process.env.NEXT_PUBLIC_GIT_COMMIT_SHA || 'clientID';

        if (serverBuildID !== clientBuildID && typeof window !== 'undefined') {
          const modalDOM = document.querySelector('.abc-modal.scrollbar.abc-modal-center');
          if (modalDOM == null) {
            router.reload();
          }
        }
      }
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
