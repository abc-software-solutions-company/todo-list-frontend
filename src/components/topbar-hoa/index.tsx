import {FC, useState} from 'react';
import styles from './topbar-hoa.module.scss';
import TopBarRightIntern from './topbar-right-intern';
import {topbarPageName} from './page-name.type';

const TopBarHoa: FC = () => {
  return (
    <div className={styles['topbar']}>
      <p className="l eading-9 text-[32px] font-bold capitalize text-blue-700">Home</p>
      <TopBarRightIntern />
    </div>
  );
};

export default TopBarHoa;
