import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import React, {useState} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';
import {IMember} from '@/data/api/types/todolist.type';

import KanbanTaskAssignee from './assignee';
import KanbanTaskCreatedDate from './created-date';
import KanbanTaskEditDelete from './edit-delete';
import KanbanTaskPriority from './priority';
import KanbanTaskStoryPoint from './story-point';
import style from './style.module.scss';
import KanbanTaskName from './task-name';
import KanbanTaskThumbnail from './thumbnail';

interface IKanbanTaskItem {
  task: any;
  assigneeList: IMember[];
}

const KanbanTaskItem = ({task, assigneeList}: IKanbanTaskItem) => {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: task});
  const [showEdiDelete, setShowEditDelete] = useState<boolean>(false);

  const styleDnd = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const onMouseOverTask = () => {
    setShowEditDelete(true);
  };
  const onMouseOutTask = () => setShowEditDelete(false);
  const taskData = JSON.parse(task);
  console.log('🚀 ~ file: index.tsx:37 ~ KanbanTaskItem ~ taskData', taskData.createdDate);

  return (
    <li
      className={style['kanban-task-item']}
      ref={setNodeRef}
      style={styleDnd}
      {...attributes}
      {...listeners}
      onMouseOver={onMouseOverTask}
      onMouseOut={onMouseOutTask}
    >
      {taskData?.attachments?.length > 0 && <KanbanTaskThumbnail url={taskData.attachments[0].link} />}
      <div className={`action-edit-delete ${showEdiDelete ? 'block' : 'hidden'}`}>
        <KanbanTaskEditDelete task={taskData} />
      </div>
      <KanbanTaskName id={taskData.id} name={taskData.name} />
      <div className="actions">
        <div className="left">
          <KanbanTaskCreatedDate date={new Date(taskData.createdDate)} />
          <KanbanTaskPriority priority={taskData.priority} taskId={taskData.id} />
          <KanbanTaskStoryPoint point={5} />
        </div>
        <div className="right">
          <KanbanTaskAssignee assignees={taskData.assignees} id={taskData.id} assigneeList={assigneeList} />
        </div>
      </div>
      <div className="status-change"></div>
    </li>
  );
};

export default KanbanTaskItem;
