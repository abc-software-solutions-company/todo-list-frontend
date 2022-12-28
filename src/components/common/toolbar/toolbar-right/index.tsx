import {FC} from 'react';

import Icon from '@/core-ui/icon';

const ToolBarRight: FC = () => {
  return (
    <div className="toolbar-right flex gap-x-7">
      <div className="view-mode flex gap-x-2">
        <div className="list-view">
          <Icon name="list-view" className="ico-vertical leading-tight" size={16} />
        </div>
        <div className="kanban-view">
          <Icon name="horizontal" className="ico-horizontal leading-tight" size={16} />
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
