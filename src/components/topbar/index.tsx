import {FC} from 'react';

import Icon from '@/core-ui/icon';
import useAuth from '@/hooks/useAuth';

import styles from './style.module.scss';

interface IProps {
  className?: string;
}

const Topbar: FC<IProps> = () => {
  const user = useAuth();

  return (
    <div className={styles.topbar}>
      <Icon name="ico-user" />
      <h4 className="title-user">{user.userName}</h4>
    </div>
  );
};

export default Topbar;
