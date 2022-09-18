import {useRouter} from 'next/router';
import {useEffect} from 'react';

import {ROUTES} from '@/configs/routes.config';

export default function RedirectToHome() {
  const router = useRouter();
  useEffect(() => {
    router.push(ROUTES.HOME);
  });
}
