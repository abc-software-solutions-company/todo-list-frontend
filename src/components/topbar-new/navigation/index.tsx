import Link from 'next/link';
import {useRouter} from 'next/router';
import {FC} from 'react';

import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';
import {isBoardPage, isListDetailPage} from '@/utils/check-routes';

import style from './style.module.scss';

const Navigation: FC = () => {
  const router = useRouter();
  const currentPage = router.asPath;
  const {id} = router.query;

  const isKanbanView = isBoardPage(currentPage, id as string);
  const isListView = isListDetailPage(currentPage, id as string);

  return (
    <div className={style.navigation}>
      <div className={style['menu-bar']}>
        <div className={style['menu-bar-left']}>
          <Link href={ROUTES.TASK}>
            <a className={(currentPage === ROUTES.TASK && style.active) || ''}>My Tasks</a>
          </Link>
          <Link href={ROUTES.LIST}>
            <a className={(currentPage === ROUTES.LIST && style.active) || ''}>My Lists</a>
          </Link>
        </div>
        <div className={style['menu-bar-right']}>
          {/* <div className="search-box">
            <input placeholder="Search" />
          </div> */}
          {(isKanbanView || isListView) && (
            <>
              <div className={`kanban-view ${isKanbanView && style['active-list-mode']}`}>
                <Icon
                  name="list-view"
                  className="ico-vertical leading-tight text-[#475569] hover:cursor-pointer"
                  size={20}
                  onClick={() => router.push(`${ROUTES.KANBAN}/${id}`)}
                />
              </div>
              <div className={`list-view ${isListView && style['active-list-mode']}`}>
                <Icon
                  name="horizontal"
                  className="ico-horizontal leading-tight text-[#475569] hover:cursor-pointer"
                  size={20}
                  onClick={() => router.push(`${ROUTES.LIST}/${id}`)}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
