import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {useRouter} from 'next/router';
import React from 'react';

import {ROUTES} from '@/configs/routes.config';
import {IAssigneeResponse} from '@/data/api/types/task.type';
import useTodolistKanban from '@/states/todolist-kanban/use-kanban';

import TaskKanbanStatusSelect from '../../actions/status';
import style from './style.module.scss';

interface IKanbanTaskItem {
  name: string;
  id: string;
  columnId: number;
  thumbnail?: string;
  dueDate?: Date;
  priority?: string;
  storyPoint?: string;
  assignees?: IAssigneeResponse[];
}

const KanbanTaskItem = ({name, id, columnId}: IKanbanTaskItem) => {
  const router = useRouter();
  const {todolistKanban, write} = useTodolistKanban();
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: id});

  const styleDnd = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div className={style['kanban-task-item']} ref={setNodeRef} style={styleDnd} {...attributes} {...listeners}>
      <p className="task-name" onClick={() => router.push(`${ROUTES.TASK}/${id}`)}>
        {name}
      </p>
      <div className="task-thumbnail"></div>
      <div className="status-change">
        {/* <TaskKanbanStatusSelect
          className="status"
          id={columnId}
          list={todolistKanban.status}
          readonly={!write}
          onChange={() => {}}
        /> */}
      </div>
    </div>
  );
};

export default KanbanTaskItem;
