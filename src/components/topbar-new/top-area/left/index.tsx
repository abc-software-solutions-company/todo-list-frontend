import {useRouter} from 'next/router';
import {FC, useEffect, useState} from 'react';

import TodolistFavorite from '@/components/common/todolist-favorite';
import Icon from '@/core-ui/icon';
import useBoards from '@/states/board/use-boards';
import useTodolist from '@/states/todolist/use-todolist';
import {isBoardPage, isListDetailPage} from '@/utils/check-routes';

import style from './style.module.scss';

const TopAreaLeft: FC = () => {
  const {todolist} = useTodolist();
  const {boardData} = useBoards();
  const router = useRouter();
  const path = router.asPath;
  const {id} = router.query;
  const [pageTitle, setPageTitle] = useState('');

  const removeNotificationNumber = () => {
    return document.title.slice(0, document.title.lastIndexOf('('));
  };

  useEffect(() => {
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
