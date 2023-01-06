import {useRouter} from 'next/router';
import {FC, useEffect, useState} from 'react';

import Back from '@/components/common/back';
import TodolistFavorite from '@/components/common/todolist-favorite';
import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';
import useBoards from '@/states/board/use-boards';
import useTodolist from '@/states/todolist/use-todolist';
import {isBoardPage, isListDetailPage} from '@/utils/check-routes';
import LocalStorage from '@/utils/local-storage';

import style from './style.module.scss';

const TopAreaLeft: FC = () => {
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

  return (
    <div className={style['top-area-left']}>
      <div className="decor">
        <div className="decor-inner">
          <Icon name="decor" className="ico-three-line text-white" />
        </div>
      </div>
      <div className="back block md:hidden">
        <Back
          visibleOn={[
            `${ROUTES.LIST}`,
            `${ROUTES.LIST}/[id]`,
            `${ROUTES.TASK}`,
            `${ROUTES.TASK}/[id]`,
            `${ROUTES.KANBAN}/[id]`
          ]}
          currentPage={currentPage}
          onClick={() => returnTo(currentPage)}
        />
      </div>
      <div className="page-title">{pageTitle}</div>
      <div className="page-action">
        <div className="favorite-list">
          {isListDetailPage(path, id as string) && <TodolistFavorite id={todolist.id} favorite={todolist.favorite} />}
          {isBoardPage(path, id as string) && <TodolistFavorite id={boardData.id} favorite={boardData.favorite} />}
        </div>
      </div>
    </div>
  );
};
export default TopAreaLeft;
