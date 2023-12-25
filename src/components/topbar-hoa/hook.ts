import {useRouter} from 'next/router';
import {useState} from 'react';

import {ROUTES} from '@/configs/routes.config';
import {useStateAuth} from '@/states/auth';
import LocalStorage from '@/utils/local-storage';

const useTopbarIntern = () => {
  const router = useRouter();
  const auth = useStateAuth();
  const [socialOpen, setSocialOpen] = useState(false);
  const handleSocial = () => setSocialOpen(true);
  const currentPage = router.pathname;

  const getPageName = () => {
    const checkPage = LocalStorage.checkPage.get();
    console.log(checkPage);
    
  }

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
        if (checkPage === ROUTES.TASK) router.push(ROUTES.TASK);
        else router.push(ROUTES.LIST);
        break;
      case `${ROUTES.DOCUMENT}` || `${ROUTES.DOCUMENT}/?id`:
        router.push(ROUTES.LIST + '/' + LocalStorage.listId.get());
        break;
      case `${ROUTES.TASK}/[id]`:
        if (checkPage === ROUTES.KANBAN) {
          router.push(ROUTES.KANBAN + '/' + LocalStorage.listId.get());
        } else if (checkPage === ROUTES.LIST) {
          router.push(ROUTES.LIST + '/' + LocalStorage.listId.get());
        } else if (checkPage === ROUTES.TASK) {
          router.push(ROUTES.TASK);
        } else if (!checkPage) {
          router.push(ROUTES.LIST + '/' + LocalStorage.listId.get());
        }
        break;
      default:
        router.back();
    }
  };

  return {returnTo, currentPage, ROUTES, auth, socialOpen, handleSocial, router, setSocialOpen};
};

export default useTopbarIntern;