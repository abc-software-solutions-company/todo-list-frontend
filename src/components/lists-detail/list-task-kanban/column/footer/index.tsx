import React from 'react';

import Icon from '@/core-ui/icon';
import useModals from '@/states/modals/use-modals';
import useTodolist from '@/states/todolist/use-todolist';

import style from './style.module.scss';

interface IKanbanColumnFooter {
  id: number;
}

export default function KanbanColumnFooter({id}: IKanbanColumnFooter) {
  const {setStatusActive, todolist} = useTodolist();
  const {setIsOpenModal, setSelectedTodolist, setSelectedColumnId} = useModals();

  const onAddTask = (columnId: number) => {
    setSelectedTodolist(todolist);
    setIsOpenModal('createTask');
    setSelectedColumnId(columnId);
  };

  return (
    <div className={style['kanban-column-footer']} onMouseLeave={() => setStatusActive(id)}>
      <Icon name="ico-plus-circle" className="btn-add-task" onClick={() => onAddTask(id)} />
    </div>
  );
}
