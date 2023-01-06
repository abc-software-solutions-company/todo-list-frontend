import {FC} from 'react';

import style from './style.module.scss';
import ToolBarLeft from './toolbar-left';
import ToolBarRight from './toolbar-right';

const ToolBarListDetail: FC = () => {
  return (
    <div className={style['toolbar-container']}>
      <ToolBarLeft />
      <ToolBarRight />
    </div>
  );
};

export default ToolBarListDetail;
