import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import React, {useState} from 'react';

import useBoards from '@/states/board/use-boards';

import KanbanTaskAssignee from './assignee';
import KanbanTaskCreatedDate from './created-date';
import KanbanTaskEditDelete from './edit-delete';
import KanbanTaskPriority from './priority';
import KanbanTaskStoryPoint from './story-point';
import style from './style.module.scss';
import KanbanTaskName from './task-name';
import KanbanTaskThumbnail from './thumbnail';

interface IKanbanTaskItem {
  id: string;
}

const KanbanTaskItem = ({id}: IKanbanTaskItem) => {
  const {boardData} = useBoards();
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id});
  const [showEdiDelete, setShowEditDelete] = useState<boolean>(false);
  const {tasks, taskSymbol} = boardData;
  const task = tasks.filter(e => e.id == id)[0];

  const styleDnd = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const onMouseOverTask = () => {
    setShowEditDelete(true);
  };
  const onMouseOutTask = () => setShowEditDelete(false);
  if (task)
    return (
      <li
        className={style[`kanban-task-item`]}
        ref={setNodeRef}
        style={styleDnd}
        {...attributes}
        {...listeners}
        onMouseOver={onMouseOverTask}
        onMouseOut={onMouseOutTask}
      >
        {task?.attachments?.length > 0 && <KanbanTaskThumbnail url={task.attachments[0].link} />}
        <div className={`action-edit-delete ${showEdiDelete ? 'block bg-white' : 'hidden'}`}>
          <KanbanTaskEditDelete task={task} />
        </div>

        <KanbanTaskName id={task.id} name={taskSymbol ? `(${taskSymbol}-${task.order}) :  ${task.name}` : task.name} />
        <div className="actions">
          <div className="left">
            <KanbanTaskCreatedDate date={new Date(task.createdDate)} />
            <KanbanTaskPriority priority={task.priority} taskId={task.id} />
            <KanbanTaskStoryPoint point={5} />
          </div>
          <div className="right">
            <KanbanTaskAssignee assignees={task.assignees} id={task.id} assigneeList={boardData.members} />
          </div>
        </div>
        <div className="status-change"></div>
      </li>
    );
};

export default KanbanTaskItem;
