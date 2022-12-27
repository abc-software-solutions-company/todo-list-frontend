import React from 'react';

import style from './style.module.scss';

interface IKanbanColumnHeader {
  name: string;
  color: string;
}
export default function KanbanColumnHeader({name, color}: IKanbanColumnHeader) {
  let normalizeName = '';
  switch (name) {
    case 'In-progress':
      normalizeName = 'In-Progress';
      break;
    case 'In-review':
      normalizeName = 'In-Review';
      break;
    default:
      normalizeName = name;
  }
  return (
    <div className={style['kanban-column-header']}>
      <p className="column-name" style={{color}}>
        {normalizeName}{' '}
      </p>
    </div>
  );
}
