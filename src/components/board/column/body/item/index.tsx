import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {useRouter} from 'next/router';
import React, {memo} from 'react';

import {ROUTES} from '@/configs/routes.config';
import useBoards from '@/states/board/use-boards';
import {PriorityIcons} from '@/utils/constant';

import KanbanTaskAssignee from './assignee';
import KanbanTaskCreatedDate from './created-date';
import KanbanTaskPriority from './priority';
import KanbanTaskStoryPoint from './story-point';
import style from './style.module.scss';
import KanbanTaskName from './task-name';
import KanbanTaskThumbnail from './thumbnail';

interface IKanbanTaskItem {
  id: string;
}

const KanbanTaskItem = ({id}: IKanbanTaskItem) => {
  const router = useRouter();
  const {boardData} = useBoards();
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id});
  const {tasks, taskSymbol} = boardData;

  const task = tasks.find(e => e.id === id);
  const styleDnd = {transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1};

  if (!task) return null;

  return (
    <li
      className={style[`kanban-task-item`]}
      ref={setNodeRef}
      style={styleDnd}
      {...attributes}
      {...listeners}
      onClick={() => router.push(`${ROUTES.TASK}/${id}`)}
    >
      {Boolean(task?.attachments?.length) && <KanbanTaskThumbnail url={task.attachments[0].link} />}
      <KanbanTaskName name={taskSymbol && task.order ? `[${taskSymbol}-${task.order}]  ${task.name}` : task.name} />
      <div className="actions">
        <div className="left">
          <KanbanTaskCreatedDate date={task.createdDate} />
          <KanbanTaskPriority priority={task.priority as keyof typeof PriorityIcons} />
          <KanbanTaskStoryPoint point={5} />
        </div>
        <div className="right">
          <KanbanTaskAssignee assignees={task.assignees} id={task.id} assigneeList={boardData.members} />
        </div>
      </div>
    </li>
  );
};

export default memo(KanbanTaskItem);
