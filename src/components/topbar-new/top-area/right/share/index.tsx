import Link from 'next/link';
import {useRouter} from 'next/router';
import {FC} from 'react';

import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';

import style from './style.module.scss';

interface ITopBarShare {
  onShare: () => void;
}

const TopBarShare: FC<ITopBarShare> = ({onShare}) => {
  const router = useRouter();
  const currentPage = router.pathname;
  return (
    <div className={style['topbar-share']}>
      <div className="topbar-link-inner">
        <Link href={ROUTES.LIST}>
          <a className={(currentPage === ROUTES.LIST && style.active) || ''}>My Lists</a>
        </Link>
        <i className="inline-block font-light not-italic text-gray-200">|</i>
        <Link href={ROUTES.LIST}>
          <a className={(currentPage === ROUTES.LIST + '/[id]' && style.active) || ''}>My Tasks</a>
        </Link>
      </div>
      <div className="topbar-share-inner" onClick={onShare}>
        <Icon name="Share" className="ico-share-3  text-white" size={20} />
        Share
      </div>
    </div>
  );
};

export default TopBarShare;
