import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {useRouter} from 'next/router';
import React, {memo} from 'react';

import {ROUTES} from '@/configs/routes.config';
import {useBoardState} from '@/hooks/useBoardState';
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
  itemId: string;
}

const KanbanTaskItem = ({itemId}: IKanbanTaskItem) => {
  const router = useRouter();
  const boardStore = useBoardState();
  const {boardData} = useBoards();
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: itemId});
  const {members, taskSymbol} = boardData;
  const task = boardStore.entitiesItem[itemId];
  const {attachments, assignees, id, name, createdDate, order, priority} = task;
  const styleDnd = {transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1};

  if (!task) return null;
  return (
    <li className={style[`kanban-task-item`]} ref={setNodeRef} style={styleDnd} {...attributes} {...listeners}>
      {Boolean(attachments?.length) && <KanbanTaskThumbnail url={attachments?.[0]?.link} />}
      <KanbanTaskName name={(taskSymbol && order ? `[${taskSymbol}-${order}]` : '') + name} />
      <div className="bg" onClick={() => router.push(`${ROUTES.TASK}/${itemId}`)} />
      <div className="actions">
        <div className="left">
          <KanbanTaskCreatedDate date={createdDate} />
          <KanbanTaskPriority priority={priority as keyof typeof PriorityIcons} />
          <KanbanTaskStoryPoint point={5} />
        </div>
        <div className="right">
          <KanbanTaskAssignee assignees={assignees} id={id} assigneeList={members} />
        </div>
      </div>
    </li>
  );
};

export default memo(KanbanTaskItem);
