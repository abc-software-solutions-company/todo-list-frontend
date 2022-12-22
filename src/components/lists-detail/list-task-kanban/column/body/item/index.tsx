import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import React, {useState} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';
import {IMember} from '@/data/api/types/todolist.type';
import useTodolistKanban from '@/states/todolist/use-todolist';

import KanbanTaskAssignee from './assignee';
import KanbanTaskCreatedDate from './created-date';
import KanbanTaskEditDelete from './edit-delete';
import KanbanTaskPriority from './priority';
import KanbanTaskStoryPoint from './story-point';
import style from './style.module.scss';
import KanbanTaskName from './task-name';
import KanbanTaskThumbnail from './thumbnail';

interface IKanbanTaskItem {
  task: ITaskResponse;
  assigneeList: IMember[];
}

const KanbanTaskItem = ({task, assigneeList}: IKanbanTaskItem) => {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: task.id});
  const [showEdiDelete, setShowEditDelete] = useState<boolean>(false);
  const {setStatusActive} = useTodolistKanban();

  const styleDnd = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const onMouseOverTask = () => {
    setShowEditDelete(true);
    setStatusActive(task.statusId);
  };
  const onMouseOutTask = () => setShowEditDelete(false);

  return (
    <div
      className={style['kanban-task-item']}
      ref={setNodeRef}
      style={styleDnd}
      {...attributes}
      {...listeners}
      onMouseOver={onMouseOverTask}
      onMouseOut={onMouseOutTask}
    >
      {task?.attachments?.length > 0 && <KanbanTaskThumbnail url={task.attachments[0].link} />}
      <div className={`action-edit-delete ${showEdiDelete ? 'block' : 'hidden'}`}>
        <KanbanTaskEditDelete task={task} />
      </div>
      <KanbanTaskName id={task.id} name={task.name} />
      <div className="actions">
        <div className="left">
          <KanbanTaskCreatedDate date={new Date(task.createdDate)} />
          <KanbanTaskPriority priority={task.priority} taskId={task.id} />
          <KanbanTaskStoryPoint point={5} />
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
