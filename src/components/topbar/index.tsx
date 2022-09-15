import Link from 'next/link';
import {FC, useContext} from 'react';

import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';
import IconButton from '@/core-ui/icon-button';
import {ThemeContext} from '@/hooks/useAuthContext';

import styles from './style.module.scss';

interface IProps {
  className?: string;
}

const Topbar: FC<IProps> = () => {
  const userObject = useContext(ThemeContext);
  if (userObject.id !== '')
    return (
      <div className={styles.topbar}>
        <div className="container">
          <div className="authenticated">
            <Icon name="ico-user" />
            <span className="h2">{userObject.userName}</span>
            <span className="sep"></span>
            <Link href={ROUTES.TODO_LIST}>
              <a className="h2">My List</a>
            </Link>
          </div>
        </div>
      </div>
    );
};

export default Topbar;
