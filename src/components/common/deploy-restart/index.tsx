import {useRouter} from 'next/router';
import {ReactNode} from 'react';
import useSWR from 'swr';

import LocalStorage from '@/utils/local-storage';

interface IDeployRestartProp {
  children: ReactNode;
}

const fetcher = (url: RequestInfo | URL) => fetch(url).then(res => res.json());

export default function DeployRestart({children}: IDeployRestartProp) {
  const {data, error} = useSWR(`${process.env.NEXT_PUBLIC_SITE_URL}/api/server-build-id`, fetcher);
  const router = useRouter();

  if (error) return <p>Sorry, Todooy is currently error</p>;
  if (!data) return <></>;

  const serverBuildID = data.serverBuildID;
  console.log('🚀 ~ file: index.tsx:29 ~ DeployRestart ~ serverBuildID', serverBuildID);
  const clientBuildID = (typeof window !== 'undefined' && LocalStorage.buildID.get()) || 'clientID';

  if (serverBuildID !== clientBuildID) {
    LocalStorage.buildID.set(serverBuildID);
    router.reload();
    return <></>;
  }

  return <>{children}</>;
}
