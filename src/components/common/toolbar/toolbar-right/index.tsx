import {useRouter} from 'next/router';
import {FC} from 'react';

import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';

import style from './style.module.scss';

const ToolBarRight: FC = () => {
  const router = useRouter();
  const {id} = router.query;
  return (
    <div className={style['toolbar-right']}>
      <div className="view-mode">
        <div className="list-view">
          <Icon
            name="list-view"
            className="ico-vertical leading-tight hover:cursor-pointer"
            size={16}
            onClick={() => router.push(`${ROUTES.LIST}/${id}`)}
          />
        </div>
        <div className="kanban-view rounded border bg-[#E5E7EB] px-1">
          <Icon
            name="horizontal"
            className="ico-horizontal leading-tight hover:cursor-pointer"
            size={16}
            onClick={() => router.push(`${ROUTES.KANBAN}/${id}`)}
          />
        </div>
      </div>
      <div className="sort">
        <span>Sort</span>
        <Icon name="Sort" className="ico-sort leading-tight hover:cursor-pointer" size={16} />
      </div>
      <div className="settings">
        <span>Settings</span>
        <Icon name="Settings" className="ico-settings leading-tight hover:cursor-pointer" size={16} />
      </div>
    </div>
  );
};

export default ToolBarRight;
