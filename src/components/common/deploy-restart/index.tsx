import {useRouter} from 'next/router';
import {ReactNode} from 'react';
import useSWR from 'swr';

interface IDeployRestartProp {
  children: ReactNode;
}

const fetcher = (url: RequestInfo | URL) => fetch(url).then(res => res.json());
const apiRoute = `${process.env.NEXT_PUBLIC_SITE_URL}/api/server-build-id`;

export default function DeployRestart({children}: IDeployRestartProp) {
  const {data, error} = useSWR(`${apiRoute}`, fetcher, {revalidateOnMount: false});
  const router = useRouter();

  if (error) return <p>Sorry, Todooy is inprogress of update or caught error.</p>;
  if (!data) return <></>;

  const serverBuildID = data.serverBuildID;
  const clientBuildID = process.env.NEXT_PUBLIC_GIT_COMMIT_SHA || 'clientID';

  if (serverBuildID !== clientBuildID && typeof window !== 'undefined') {
    const modalDOM = document.querySelector('.abc-modal.scrollbar.abc-modal-center');
    if (modalDOM == null) router.reload();
    return <></>;
  }

  return <>{children}</>;
}
