import React from 'react';

import {IAssigneeResponse} from '@/data/api/types/task.type';

import style from './style.module.scss';

interface IKanbanTaskItem {
  name: string;
  thumbnail?: string;
  dueDate?: Date;
  priority?: string;
  storyPoint?: string;
  assignees?: IAssigneeResponse[];
}

const KanbanTaskItem = ({name}: IKanbanTaskItem) => {
  return (
    <div className={style['kanban-task-item']}>
      <p className="task-name">{name}</p>
      <div className="task-thumbnail"></div>
    </div>
  );
};

export default KanbanTaskItem;
