import Link from 'next/link';
import {useRouter} from 'next/router';
import {FC} from 'react';

import {ROUTES} from '@/configs/routes.config';

import style from './style.module.scss';

const Navigation: FC = () => {
  const router = useRouter();
  const currentPage = router.asPath;
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
        {/* <div className={style['menu-bar-right']}>
          <div className="search-box">
            <input placeholder="Search" />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Navigation;
