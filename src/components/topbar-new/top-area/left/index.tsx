/* eslint-disable @next/next/no-img-element */
import {FC} from 'react';

import Back from '@/components/common/back';
import TodolistFavorite from '@/components/common/todolist-favorite';
import {ROUTES} from '@/configs/routes.config';
import {isBoardPage, isDocumentPage, isListDetailPage, isMyListPage, isMyTasksPage} from '@/utils/check-routes';

import useTopAreaLeft from './hook';
import style from './style.module.scss';

const TopAreaLeft: FC = () => {
  const {boardData, currentPage, id, path, returnTo, todolist} = useTopAreaLeft();

  return (
    <div className={style['top-area-left']}>
      <div className="decor">
        <div className="decor-inner">
          <img src="/icons/breadcumb.png" alt="Google Login" />
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
      <div className="page-title">
        <p>{`To-Do List
         ${isMyListPage(path, id as string) ? '| My Lists' : ''}
         ${isMyTasksPage(path, id as string) ? '| My Tasks' : ''}
         ${isListDetailPage(path, id as string) || isDocumentPage(path, id as string) ? `| ${todolist.name}` : ''}
         ${isBoardPage(path, id as string) ? `| ${boardData.name}` : ''}
        `}</p>

        <div className="page-action">
          <div className="favorite-list">
            {isListDetailPage(path, id as string) && <TodolistFavorite id={todolist.id} favorite={todolist.favorite} />}
            {isBoardPage(path, id as string) && <TodolistFavorite id={boardData.id} favorite={boardData.favorite} />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TopAreaLeft;
