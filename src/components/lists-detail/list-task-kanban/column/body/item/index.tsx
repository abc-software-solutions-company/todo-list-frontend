import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import React from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';
import {IMember} from '@/data/api/types/todolist.type';

import KanbanTaskAssignee from './assignee';
import KanbanTaskCreatedDate from './created-date';
import KanbanTaskPriority from './priority';
import style from './style.module.scss';
import KanbanTaskName from './task-name';
import KanbanTaskThumbnail from './thumbnail';

interface IKanbanTaskItem {
  task: ITaskResponse;
  assigneeList: IMember[];
}

const KanbanTaskItem = ({task, assigneeList}: IKanbanTaskItem) => {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: task.id});

  const styleDnd = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div className={style['kanban-task-item']} ref={setNodeRef} style={styleDnd} {...attributes} {...listeners}>
      {task?.attachments?.length > 0 && <KanbanTaskThumbnail url={task.attachments[0].link} />}
      <KanbanTaskName id={task.id} name={task.name} />
      <div className="actions">
        <div className="left">
          <KanbanTaskCreatedDate date={new Date(task.createdDate)} />
          <KanbanTaskPriority priority={task.priority} taskId={task.id} />
        </div>
        <div className="right">
          <KanbanTaskAssignee assignees={task.assignees} id={task.id} assigneeList={assigneeList} />
        </div>
      </div>
      <div className="status-change"></div>
    </div>
  );
};

export default KanbanTaskItem;
