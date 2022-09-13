import cls from 'classnames';
import {FC, useContext} from 'react';

import Icon from '@/core-ui/icon';
import {ThemeContext} from '@/hooks/useAuthContext';

import styles from './style.module.scss';

interface IProps {
  className?: string;
}

const Topbar: FC<IProps> = () => {
  const user = useContext(ThemeContext);

  return (
    <div className={cls(styles.topbar)}>
      <Icon name="ico-user" />
      <h4 className="h5">{user.userName}</h4>
    </div>
  );
};

export default Topbar;
