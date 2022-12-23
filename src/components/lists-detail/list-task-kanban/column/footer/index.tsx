import React from 'react';

import Icon from '@/core-ui/icon';
import useTodolist from '@/states/todolist/use-todolist';

import style from './style.module.scss';

interface IKanbanColumnFooter {
  onAddTask?: () => void;
  id: number;
}

export default function KanbanColumnFooter({id, onAddTask}: IKanbanColumnFooter) {
  const {setStatusActive} = useTodolist();
  return (
    <div className={style['kanban-column-footer']} onMouseLeave={() => setStatusActive(id)}>
      aaa
      <Icon name="ico-plus-circle" className="btn-add-task" onClick={onAddTask} />
    </div>
  );
}
