import {useRouter} from 'next/router';
import {useState} from 'react';

import {ROUTES} from '@/configs/routes.config';
import {useStateAuth} from '@/states/auth';
import LocalStorage from '@/utils/local-storage';

const useTopbar = () => {
  const router = useRouter();
  const auth = useStateAuth();
  const [socialOpen, setSocialOpen] = useState(false);
  const handleSocial = () => setSocialOpen(true);
  const currentPage = router.pathname;

  const returnTo = (curPage: string) => {
    const checkPage = LocalStorage.checkPage.get();
    switch (curPage) {
      case `${ROUTES.LIST}`:
        router.push(ROUTES.HOME);
        break;
      case `${ROUTES.TASK}`:
        router.push(ROUTES.LIST);
        break;
      case `${ROUTES.LIST}/[id]`:
        if (checkPage === '/tasks') router.push(ROUTES.TASK);
        else router.push(ROUTES.LIST);
        break;
      case `${ROUTES.TASK}/[id]`:
        if (checkPage === '/lists') {
          router.push(ROUTES.LIST + '/' + LocalStorage.listId.get());
        } else if (checkPage === '/tasks') {
          router.push(ROUTES.TASK);
        }
        break;
      default:
        router.back();
    }
  };
  return {returnTo, currentPage, auth, socialOpen, handleSocial, router, setSocialOpen};
};

export default useTopbar;
