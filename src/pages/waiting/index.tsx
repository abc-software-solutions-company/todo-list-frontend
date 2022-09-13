import {useRouter} from 'next/router';
import React, {useEffect} from 'react';

import {ROUTES} from '@/configs/routes.config';

export default function Waiting() {
  const router = useRouter();

  useEffect(() => {
    router.push(ROUTES.ACTION);
  }, []);
  return <></>;
}
