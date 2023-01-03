import {FC} from 'react';

import Notification from '@/components/notification';

import TopBarAccount from './account';
import TopBarShare from './share';
import style from './style.module.scss';

const TopAreaRight: FC = () => {
  return (
    <div className={style['top-area-right']}>
      <TopBarShare />
      <div className="notification">
        <Notification />
      </div>
      <TopBarAccount />
    </div>
  );
};
export default TopAreaRight;
