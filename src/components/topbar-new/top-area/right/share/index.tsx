import {FC} from 'react';

import Icon from '@/core-ui/icon';

import style from './style.module.scss';

interface ITopBarShare {
  onShare: () => void;
}

const TopBarShare: FC<ITopBarShare> = ({onShare}) => {
  return (
    <div className={style['topbar-share']} onClick={onShare}>
      <div className="topbar-share-inner">
        <Icon name="Share" className="ico-share-3  text-white" />
        Share
      </div>
    </div>
  );
};

export default TopBarShare;
