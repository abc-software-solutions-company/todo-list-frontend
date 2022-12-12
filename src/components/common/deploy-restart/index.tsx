import {useRouter} from 'next/router';
import {ReactNode} from 'react';
import useSWR from 'swr';

import useModals from '@/states/modals/use-modals';

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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {isOpenModal} = useModals();
  console.log('🚀 ~ file: index.tsx:25 ~ DeployRestart ~ isOpenModal', isOpenModal);

  if (serverBuildID !== clientBuildID) {
    if (Object.values(isOpenModal).every(e => e == false)) router.reload();
    return <></>;
  }

  return <>{children}</>;
}
