import {useRouter} from 'next/router';
import React, {useEffect} from 'react';

import {ROUTES} from '@/configs/routes.config';
import useLocalStorage from '@/utils/local-storage';

export default function Waiting() {
  const router = useRouter();
  const {readPreviousLink} = useLocalStorage();

  useEffect(() => {
    // router.push(ROUTES.ACTION);
    const previousPage = readPreviousLink();
    if (previousPage) {
      router.push(previousPage);
    } else {
      router.push(ROUTES.ACTION);
    }
  }, []);
  return <></>;
}
