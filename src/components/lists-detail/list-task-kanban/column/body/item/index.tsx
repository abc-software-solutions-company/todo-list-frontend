import {useRouter} from 'next/router';
import React from 'react';

import {ROUTES} from '@/configs/routes.config';
import {IAssigneeResponse} from '@/data/api/types/task.type';

import style from './style.module.scss';

interface IKanbanTaskItem {
  name: string;
  id: string;
  thumbnail?: string;
  dueDate?: Date;
  priority?: string;
  storyPoint?: string;
  assignees?: IAssigneeResponse[];
}

const KanbanTaskItem = ({name, id}: IKanbanTaskItem) => {
  const router = useRouter();
  return (
    <div className={style['kanban-task-item']}>
      <p className="task-name" onClick={() => router.push(`${ROUTES.TASK}/${id}`)}>
        {name}
      </p>
      <div className="task-thumbnail"></div>
    </div>
  );
};

export default KanbanTaskItem;
