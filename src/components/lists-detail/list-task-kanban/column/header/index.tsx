import React from 'react';

import Icon from '@/core-ui/icon';
import useModals from '@/states/modals/use-modals';
import useTodolist from '@/states/todolist/use-todolist';

interface IKanBanColumnHeader {
  name: string;
  statusId: number;
}

export default function KanbanColumnHeader({name, statusId}: IKanBanColumnHeader) {
  const {todolist} = useTodolist();

  const {setIsOpenModal, setSelectedTask, setSelectedTodolist, setSelectedStatusId} = useModals();

  const onAddTask = () => {
    setSelectedTask();
    setSelectedTodolist(todolist);
    setIsOpenModal('createTask');
    setSelectedStatusId(statusId);
  };

  return (
    <div className="kanban-header">
      <h3 className="text-center">{name}</h3>
      <Icon name="ico-plus-circle" className="flex justify-center hover:cursor-pointer" onClick={onAddTask} />
    </div>
  );
}
