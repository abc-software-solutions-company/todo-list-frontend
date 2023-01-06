/* eslint-disable @next/next/no-img-element */
import {FC} from 'react';

import Back from '@/components/common/back';
import TodolistFavorite from '@/components/common/todolist-favorite';
import {ROUTES} from '@/configs/routes.config';
import {isBoardPage, isListDetailPage} from '@/utils/check-routes';

import useTopAreaLeft from './hook';
import style from './style.module.scss';

const TopAreaLeft: FC = () => {
  const {boardData, currentPage, id, pageTitle, path, returnTo, todolist} = useTopAreaLeft();
  return (
    <div className={style['top-area-left']}>
      <div className="decor">
        <div className="decor-inner">
          {/* <Icon name="decor" className="ico-three-line text-white" /> */}
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
        <p>{pageTitle}</p>
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
