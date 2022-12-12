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
  const {data, error} = useSWR(`${apiRoute}`, fetcher);
  const router = useRouter();

  if (error) return <p>Sorry, Todooy is inprogress of update or caught error.</p>;
  if (!data) return <></>;

  nProgress.configure({
    minimum: 0.3,
    easing: 'ease',
    speed: 800,
    showSpinner: true
  });

  const serverBuildID = data.serverBuildID;
  const clientBuildID = process.env.NEXT_PUBLIC_GIT_COMMIT_SHA || 'clientID';

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const progress = () => {
      nProgress.start();
      if (serverBuildID !== clientBuildID) {
        console.log('Deploy Reload');
        router.reload();
        return <></>;
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
  }, [serverBuildID, clientBuildID]);

  return <>{children}</>;
};

export default NProgres;
