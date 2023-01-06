import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import {ROUTES} from '@/configs/routes.config';
import useBoards from '@/states/board/use-boards';
import useTodolist from '@/states/todolist/use-todolist';
import LocalStorage from '@/utils/local-storage';

const useTopAreaLeft = () => {
  const {todolist} = useTodolist();
  const {boardData} = useBoards();
  const router = useRouter();

  const path = router.asPath;
  const currentPage = router.pathname;
  const {id} = router.query;

  const [pageTitle, setPageTitle] = useState('');

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

  const removeNotificationNumber = () => {
    return document.title.slice(0, document.title.lastIndexOf('('));
  };

  useEffect(() => {
    setPageTitle(removeNotificationNumber);
    router.events.on('routeChangeComplete', () => {
      setPageTitle(removeNotificationNumber);
    });
  }, []);

  return {todolist, boardData, path, currentPage, pageTitle, returnTo, id};
};

export default useTopAreaLeft;
