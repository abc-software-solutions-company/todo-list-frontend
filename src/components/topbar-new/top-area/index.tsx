import {FC} from 'react';

import TopAreaLeft from './left';
import TopAreaRight from './right';
import style from './style.module.scss';

const TopArea: FC = () => {
  return (
    <div className={style['top-area']}>
      <TopAreaLeft />
      <TopAreaRight />
    </div>
  );
};

export default TopArea;
