import {useRouter} from 'next/router';
import {ReactNode, useEffect} from 'react';

import LocalStorage from '@/utils/local-storage';

interface IDeployRestartProp {
  children: ReactNode;
}

export default function DeployRestart({children}: IDeployRestartProp) {
  const router = useRouter();
  const serverBuildID = process.env.NEXT_PUBLIC_GIT_COMMIT_SHA || 'serverID';
  const clientBuildID = (typeof window !== 'undefined' && LocalStorage.buildID.get()) || 'clientID';

  useEffect(() => {
    if (clientBuildID !== serverBuildID) {
      LocalStorage.buildID.set(serverBuildID);
      router.reload();
    }
  }, [clientBuildID, serverBuildID]);

  return <>{children}</>;
}
