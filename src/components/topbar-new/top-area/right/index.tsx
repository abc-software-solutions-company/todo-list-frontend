import {FC} from 'react';

import style from './style.module.scss';

const TopAreaRight: FC = () => {
  return (
    <div className={style['top-area-right']}>
      <div className="share">Share</div>
      <div className="notification">Notification</div>
      <div className="account">Account</div>
    </div>
  );
};
export default TopAreaRight;
