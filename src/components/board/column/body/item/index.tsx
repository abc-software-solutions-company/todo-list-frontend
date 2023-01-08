import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import React, {useState} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';
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
  task: ITaskResponse;
}

const KanbanTaskItem = ({task}: IKanbanTaskItem) => {
  const {boardData} = useBoards();
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
      <p>{task}</p>
    </li>
  );
};

export default KanbanTaskItem;
