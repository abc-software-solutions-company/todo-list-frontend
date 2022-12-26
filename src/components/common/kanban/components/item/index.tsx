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
  const styleOverLay = {
    cursor: dragOverlay ? 'grabbing' : 'grab'
  };
  const task = JSON.parse(id);

  return (
    <div style={styleOverLay} className={style['item-kanban bg-blue-300']}>
      {/* <KanbanTaskItem task={task} assigneeList={todolist.members} /> */}
      {/* {task.name} */}
      {task?.attachments?.length > 0 && <KanbanTaskThumbnail url={task.attachments[0].link} />}
      {/* <div className={`action-edit-delete ${showEdiDelete ? 'block' : 'hidden'}`}>
        <KanbanTaskEditDelete task={task} />
      </div> */}
      <KanbanTaskName id={task.id} name={task.name} />
      <div className="actions">
        <div className="left">
          <KanbanTaskCreatedDate date={new Date(task.createdDate)} />
          <KanbanTaskPriority priority={task.priority} taskId={task.id} />
          <KanbanTaskStoryPoint point={5} />
        </div>
        <div className="right">
          <KanbanTaskAssignee assignees={task.assignees} id={task.id} assigneeList={todolist.members} />
        </div>
      </div>
      <div className="status-change"></div>
    </div>
  );
};

export default Item;
