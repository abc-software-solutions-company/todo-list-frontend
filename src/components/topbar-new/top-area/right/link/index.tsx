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
        <span className={(currentPage === ROUTES.TASK && style.active) || ''}>My Tasks</span>
      </Link>
      <i className="inline-block font-light not-italic text-gray-200">|</i>
      <Link href={ROUTES.LIST}>
        <span className={(currentPage === ROUTES.LIST && style.active) || ''}>My Lists</span>
      </Link>
    </div>
  );
};

export default TopBarLink;
