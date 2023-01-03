import {useRouter} from 'next/router';
import {FC, useEffect, useState} from 'react';

import TodolistFavorite from '@/components/common/todolist-favorite';
import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';
import useBoards from '@/states/board/use-boards';
import useTodolist from '@/states/todolist/use-todolist';
import {MUI_ICON} from '@/utils/mui-icon';

import style from './style.module.scss';

const TopAreaLeft: FC = () => {
  const router = useRouter();
  const {todolist} = useTodolist();
  const {boardData} = useBoards();
  const isBoardPage = router.asPath.includes(ROUTES.KANBAN);
  const [pageTitle, setPageTitle] = useState('');
  useEffect(() => {
    if (typeof window !== undefined) {
      setPageTitle(document.title);
    }
    router.events.on('routeChangeComplete', () => {
      setPageTitle(document.title);
    });
  }, []);

  return (
    <div className={style['top-area-left']}>
      <div className="decor">
        <Icon name="decor" className="ico-three-line text-white" />
      </div>
      <div className="page-title">{pageTitle}</div>
      <div className="page-action">
        <div className="favorite-list">
          {todolist && !isBoardPage && <TodolistFavorite id={todolist.id} favorite={todolist.favorite} />}
          {boardData && isBoardPage && <TodolistFavorite id={boardData.id} favorite={boardData.favorite} />}
        </div>
        <div className="more">
          <MUI_ICON.MORE_VERT />
        </div>
      </div>
    </div>
  );
};
export default TopAreaLeft;
