import cls from 'classnames';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {FC, useContext} from 'react';

import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';
import {ThemeContext} from '@/hooks/useAuthContext';

import Back from '../back';
import styles from './style.module.scss';

interface IProps {
  className?: string;
}

const Topbar: FC<IProps> = ({className}) => {
  const router = useRouter();
  const userObject = useContext(ThemeContext);

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
      <div className="container">
        <Back visibleOn={['/list', '/list/[id]']} currentPage={currentPage} onClick={() => returnTo(currentPage)} />
        <div className="authenticated">
          <Icon name="ico-user" className="user" />
          <span className="h2">{userObject.userName ?? ''}</span>
          <span className="sep"></span>
          <Link href={ROUTES.TODO_LIST}>
            <a>
              <h2>My List</h2>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
