import React from 'react';

import KanbanTaskAssignee from '@/components/lists-detail/list-task-kanban/column/body/item/assignee';
import KanbanTaskCreatedDate from '@/components/lists-detail/list-task-kanban/column/body/item/created-date';
import KanbanTaskPriority from '@/components/lists-detail/list-task-kanban/column/body/item/priority';
import KanbanTaskStoryPoint from '@/components/lists-detail/list-task-kanban/column/body/item/story-point';
import KanbanTaskName from '@/components/lists-detail/list-task-kanban/column/body/item/task-name';
import KanbanTaskThumbnail from '@/components/lists-detail/list-task-kanban/column/body/item/thumbnail';
import useTodolist from '@/states/todolist/use-todolist';

import style from './style.module.scss';

interface IItemKanbanProp {
  id: any;
  dragOverlay: any;
}

const Item = ({id, dragOverlay}: IItemKanbanProp) => {
  const {todolist} = useTodolist();
  const {tasks} = todolist;
  const styleOverLay = {
    cursor: dragOverlay ? 'grabbing' : 'grab'
  };

  return (
    <div style={styleOverLay} className={style['item-kanban bg-blue-300']}>
      {tasks.filter(x => x.id == id)[0].name}
    </div>
  );
};

export default Item;
