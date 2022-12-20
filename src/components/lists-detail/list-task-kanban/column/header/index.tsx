import React from 'react';

import style from './style.module.scss';

interface IKanbanColumnHeader {
  name: string;
  color: string;
}
export default function KanbanColumnHeader({name, color}: IKanbanColumnHeader) {
  return (
    <div className={style['kanban-column-header']}>
      <p className="column-name" style={{color}}>
        {name}
      </p>
    </div>
  );
}
