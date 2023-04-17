import React, {FC, memo} from 'react';

import style from './style.module.scss';

interface IKanbanColumnHeaderProps {
  name: string;
  color: string;
}

const KanbanColumnHeader: FC<IKanbanColumnHeaderProps> = ({name, color}) => {
  return (
    <div className={style['kanban-column-header']}>
      <p className="column-name" style={{color}}>
        {name}
      </p>
    </div>
  );
};

export default memo(KanbanColumnHeader);
