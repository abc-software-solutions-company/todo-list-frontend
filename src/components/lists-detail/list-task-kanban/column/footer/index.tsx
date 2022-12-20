import React from 'react';

import Icon from '@/core-ui/icon';

import style from './style.module.scss';

interface IKanbanColumnFooter {
  onAddTask?: () => void;
}

export default function KanbanColumnFooter({onAddTask}: IKanbanColumnFooter) {
  return (
    <div className={style['kanban-column-footer']}>
      <Icon name="ico-plus-circle" className="btn-add-task" onClick={onAddTask} />
    </div>
  );
}
