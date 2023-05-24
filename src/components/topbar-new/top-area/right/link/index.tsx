import Link from 'next/link';
import {useRouter} from 'next/router';

import {ROUTES} from '@/configs/routes.config';

import style from './style.module.scss';

const TopBarLink = () => {
  const router = useRouter();
  const currentPage = router.pathname;

  return (
    <div className={style['topbar-link']}>
      <Link href={ROUTES.TASK}>
        <a className={(currentPage === ROUTES.TASK && style.active) || 'un-active'}>My Tasks</a>
      </Link>
      <i className="inline-block font-light not-italic text-gray-200">|</i>
      <Link href={ROUTES.LIST}>
        <a className={(currentPage === ROUTES.LIST && style.active) || 'un-active'}>My Lists</a>
      </Link>
    </div>
  );
};

export default TopBarLink;
