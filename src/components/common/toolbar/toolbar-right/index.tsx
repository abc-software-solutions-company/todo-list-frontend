import {useRouter} from 'next/router';
import {FC} from 'react';

import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';

const ToolBarRight: FC = () => {
  const router = useRouter();
  const {id} = router.query;
  return (
    <div className="toolbar-right flex gap-x-7">
      <div className="view-mode flex gap-x-2">
        <div className="list-view">
          <Icon
            name="list-view"
            className="ico-vertical leading-tight hover:cursor-pointer"
            size={16}
            onClick={() => router.push(`${ROUTES.LIST}/${id}`)}
          />
        </div>
        <div className="kanban-view">
          <Icon
            name="horizontal"
            className="ico-horizontal leading-tight hover:cursor-pointer"
            size={16}
            onClick={() => router.push(`${ROUTES.KANBAN}/${id}`)}
          />
        </div>
      </div>
      <div className="sort flex gap-x-1">
        <span>Sort</span>
        <Icon name="Sort" className="ico-sort leading-tight" size={16} />
      </div>
      <div className="settings flex gap-x-1">
        <span>Settings</span>
        <Icon name="Settings" className="ico-settings leading-tight" size={16} />
      </div>
    </div>
  );
};

export default ToolBarRight;
