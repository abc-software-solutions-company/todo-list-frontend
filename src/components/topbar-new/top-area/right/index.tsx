import {FC} from 'react';

import Notification from '@/components/notification';

import TopBarAccount from './account';
import style from './style.module.scss';

const TopAreaRight: FC = () => {
  return (
    <div className={style['top-area-right']}>
      <div className="share">Share</div>
      <div className="notification">
        <Notification />
      </div>
      <div className="account">
        <TopBarAccount />
      </div>
    </div>
  );
};
export default TopAreaRight;
