import cls from 'classnames';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {FC} from 'react';

import {ROUTES} from '@/configs/routes.config';
import {useStateAuth} from '@/contexts/auth/context';
import Icon from '@/core-ui/icon';

import Back from '../back';
import styles from './style.module.scss';

interface IProps {
  className?: string;
}

const Topbar: FC<IProps> = ({className}) => {
  const router = useRouter();
  const auth = useStateAuth();

  const currentPage = router.pathname;

  const returnTo = (curPage: string) => {
    switch (curPage) {
      case '/list':
        router.push(ROUTES.ACTION);
        break;
      case '/list/[id]':
        router.push(ROUTES.TODO_LIST);
        break;
    }
  };

  return (
    <div className={cls(styles.topbar, className)}>
      {auth.user && (
        <div className="container">
          <Back visibleOn={['/list', '/list/[id]']} currentPage={currentPage} onClick={() => returnTo(currentPage)} />
          <div className="authenticated">
            <Icon name="ico-user" />
            <span className="h2">{auth.user?.userName}</span>
            <span className="sep"></span>
            <Link href={ROUTES.TODO_LIST}>
              <a className="h2">My List</a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Topbar;
