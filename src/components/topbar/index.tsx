import {FC} from 'react';

import Icon from '@/core-ui/icon';
// import {ThemeContext} from '@/hooks/useAuthContext';

import styles from './style.module.scss';

interface IProps {
  className?: string;
}

const Topbar: FC<IProps> = () => {
  // const user = useContext(ThemeContext);

  return (
    <div className={styles.topbar}>
      <Icon name="ico-user" />
      <span className="h5">Thiện</span>
      <span className="sep"></span>
      <span className="h5">My List</span>
    </div>
  );
};

export default Topbar;
