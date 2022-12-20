import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import React from 'react';

import {IAssigneeResponse} from '@/data/api/types/task.type';

import KanbanTaskDueDate from './due-date';
import KanbanTaskPriority from './priority';
import style from './style.module.scss';
import KanbanTaskName from './task-name';
import KanbanTaskThumbnail from './thumbnail';

interface IKanbanTaskItem {
  name: string;
  id: string;
  columnId: number;
  thumbnail: string;
  dueDate: Date;
  priority: string;
  storyPoint?: string;
  assignees?: IAssigneeResponse[];
}

const KanbanTaskItem = ({name, id, dueDate, priority}: IKanbanTaskItem) => {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: id});

  const styleDnd = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 0.5 : 1
  };

  return (
    <div className={style['kanban-task-item']} ref={setNodeRef} style={styleDnd} {...attributes} {...listeners}>
      <KanbanTaskThumbnail url={'https://www.w3schools.com/html/pic_trulli.jpg'} />
      <KanbanTaskName id={id} name={name} />
      <div className="actions">
        <div className="left">
          <KanbanTaskDueDate date={dueDate} />
          <KanbanTaskPriority priority={priority} taskId={id} />
        </div>
        <div className="right"></div>
      </div>
      <div className="status-change"></div>
    </div>
  );
};

export default KanbanTaskItem;
