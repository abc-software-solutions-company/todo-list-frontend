import React from 'react';

import KanbanTaskItem from '@/components/lists-detail/list-task-kanban/column/body/item';
import useTodolist from '@/states/todolist/use-todolist';

import style from './style.module.scss';

interface IItemKanbanProp {
  id: any;
  dragOverlay: any;
}

const Item = ({id, dragOverlay}: IItemKanbanProp) => {
  const {todolist} = useTodolist();

  const styleOverLay = {
    cursor: dragOverlay ? 'grabbing' : 'grab'
  };

  return (
    <div style={styleOverLay} className={style['item-kanban bg-blue-300']}>
      <KanbanTaskItem assigneeList={todolist.members} task={todolist.tasks.filter(e => e.id == id)[0]} />
    </div>
  );
};

export default Item;
