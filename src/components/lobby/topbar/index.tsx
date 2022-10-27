import {FC} from 'react';

import ABC_LogoText from '@/components/common/icons/abc-logo-text';
import Topbar from '@/components/topbar';

import styles from './style.module.scss';

const TopBarLobby: FC = () => {
  return (
    <>
      <div className={styles['topbar-lobby']}>
        <div className="inner flex justify-between">
          <div className="logo pt-7">
            <ABC_LogoText />
          </div>
          <div className="topbar text-white">
            <Topbar />
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBarLobby;
