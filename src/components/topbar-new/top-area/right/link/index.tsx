import Link from 'next/link';
import {useRouter} from 'next/router';

import {ROUTES} from '@/configs/routes.config';

import style from './style.module.scss';

const TopBarLink = () => {
  const router = useRouter();
  const currentPage = router.pathname;
  return (
    <div className={style['topbar-link']}>
      <Link href={ROUTES.LIST}>
        <a className={(currentPage === ROUTES.LIST && style.active) || ''}>My Lists</a>
      </Link>
      <i className="inline-block font-light not-italic text-gray-200">|</i>
      <Link href={ROUTES.TASK}>
        <a
          className={
            ((currentPage === ROUTES.LIST + '/[id]' ||
              currentPage === ROUTES.TASK ||
              currentPage === ROUTES.KANBAN + '/[id]') &&
              style.active) ||
            ''
          }
        >
          My Tasks
        </a>
      </Link>
    </div>
  );
};

export default TopBarLink;
