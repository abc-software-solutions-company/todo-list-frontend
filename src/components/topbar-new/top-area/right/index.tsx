import {FC} from 'react';

import Notification from '@/components/notification';

import TopBarAccount from './account';
import TopBarShare from './share';
import style from './style.module.scss';

const TopAreaRight: FC = () => {
  return (
    <div className={style['top-area-right']}>
      <TopBarShare />
      <Notification />
      <TopBarAccount />
    </div>
  );
};
export default TopAreaRight;
