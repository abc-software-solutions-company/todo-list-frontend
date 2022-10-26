import {FC} from 'react';

import TreeLeft from '../common/icons/tree-left';
import TreeRight from '../common/icons/tree-right';
import styles from './style.module.scss';

const LoginDecor: FC = () => {
  return (
    <>
      <div className={styles['com-login-decor']}>
        <div className={styles.container}>
          <div className={styles.trees}>
            <TreeLeft />
            <TreeRight />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginDecor;
