import {FC} from 'react';

import style from './style.module.scss';

const TopAreaLeft: FC = () => {
  return (
    <div className={style['top-area-left']}>
      <div className="decor">Decorator</div>
      <div className="page-name">Page Name</div>
      <div className="page-action">
        <div className="favorite">Favorite</div>
        <div className="more">More</div>
      </div>
    </div>
  );
};
export default TopAreaLeft;
