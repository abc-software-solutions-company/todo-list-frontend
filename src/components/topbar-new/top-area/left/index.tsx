import {FC} from 'react';

import Icon from '@/core-ui/icon';
import {MUI_ICON} from '@/utils/mui-icon';

import style from './style.module.scss';

const TopAreaLeft: FC = () => {
  return (
    <div className={style['top-area-left']}>
      <div className="decor">
        <Icon name="decor" className="ico-three-line text-white" />
      </div>
      <div className="page-title">To-do list tasks</div>
      <div className="page-action">
        <div className="favorite">
          <Icon name="favorite" className="ico-star  text-[#38BDF8]" />
        </div>
        <div className="more">
          <MUI_ICON.MORE_VERT />
        </div>
      </div>
    </div>
  );
};
export default TopAreaLeft;
