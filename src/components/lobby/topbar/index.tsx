import {FC} from 'react';

import ABC_LogoText from '@/components/common/icons/abc-logo-text';
import Topbar from '@/components/topbar';

import styles from './style.module.scss';

const TopBarLobby: FC = () => {
  return (
    <>
      <div className={styles['topbar-lobby']}>
        <div className="container">
          <div className="inner">
            <div className="logo">
              <ABC_LogoText />
            </div>
            <div className="topbar">
              <Topbar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBarLobby;
