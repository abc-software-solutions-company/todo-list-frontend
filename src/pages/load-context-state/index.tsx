import {useRouter} from 'next/router';
import React, {useEffect} from 'react';

import {ROUTES} from '@/configs/routes.config';
import useLocalStorage from '@/utils/local-storage';

export default function Waiting() {
  const router = useRouter();
  const {readPreviousLink} = useLocalStorage();

  useEffect(() => {
    const previousPage = readPreviousLink();
    if (previousPage) {
      router.push(previousPage);
    } else {
      router.push(ROUTES.ACTION);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}
