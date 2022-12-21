import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import React from 'react';

import {IAssigneeResponse, IAttachmentResponse} from '@/data/api/types/task.type';
import {IMember} from '@/data/api/types/todolist.type';

import KanbanTaskAssignee from './assignee';
import KanbanTaskCreatedDate from './created-date';
import KanbanTaskPriority from './priority';
import style from './style.module.scss';
import KanbanTaskName from './task-name';
import KanbanTaskThumbnail from './thumbnail';

interface IKanbanTaskItem {
  name: string;
  id: string;
  columnId: number;
  thumbnail: string;
  createdDate: Date;
  priority: string;
  storyPoint?: string;
  attachments: IAttachmentResponse[];
  assignees: IAssigneeResponse[];
  assigneeList: IMember[];
}

const KanbanTaskItem = ({name, id, createdDate, priority, assignees, assigneeList, attachments}: IKanbanTaskItem) => {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: id});

  const styleDnd = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div className={style['kanban-task-item']} ref={setNodeRef} style={styleDnd} {...attributes} {...listeners}>
      {attachments[0] && <KanbanTaskThumbnail url={attachments[0].link} />}
      <KanbanTaskName id={id} name={name} />
      <div className="actions">
        <div className="left">
          <KanbanTaskCreatedDate date={createdDate} />
          <KanbanTaskPriority priority={priority} taskId={id} />
        </div>
        <div className="right">
          <KanbanTaskAssignee assignees={assignees} id={id} assigneeList={assigneeList} />
        </div>
      </div>
      <div className="status-change"></div>
    </div>
  );
};

export default KanbanTaskItem;
