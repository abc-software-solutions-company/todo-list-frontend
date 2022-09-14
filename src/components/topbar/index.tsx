import Link from 'next/link';
import {FC} from 'react';

import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';

import styles from './style.module.scss';

interface IProps {
  className?: string;
}

const Topbar: FC<IProps> = () => {
  return (
    <div className={styles.topbar}>
      <div className="container">
        <h2>REeeeeeeeeeeee</h2>
        <div className="authenticated">
          <Icon name="ico-user" />
          <span className="h5">Thiện</span>
          <span className="sep"></span>
          <Link href={ROUTES.TODO_LIST}>
            <a className="h5">My List</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
