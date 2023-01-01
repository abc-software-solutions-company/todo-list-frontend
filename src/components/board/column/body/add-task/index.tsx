import React from 'react';

import Icon from '@/core-ui/icon';
import useBoards from '@/states/board/use-boards';
import useModals from '@/states/modals/use-modals';

import style from './style.module.scss';

interface IKanbanColumnFooter {
  id: number;
}

export default function KanbanColumnFooter({id}: IKanbanColumnFooter) {
  const {boardData} = useBoards();
  const {setIsOpenModal, setSelectedTodolist, setSelectedColumnId} = useModals();

  const onAddTask = (columnId: number) => {
    setSelectedTodolist(boardData);
    setIsOpenModal('createTask');
    setSelectedColumnId(columnId);
  };

  return (
    <div className={style['add-task-kanban']}>
      <Icon name="ico-plus-circle" className="btn-add-task" onClick={() => onAddTask(id)} />
    </div>
  );
}
