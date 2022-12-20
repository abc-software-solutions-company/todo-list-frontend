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
  return (
    <div className={style['kanban-task-item']}>
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
