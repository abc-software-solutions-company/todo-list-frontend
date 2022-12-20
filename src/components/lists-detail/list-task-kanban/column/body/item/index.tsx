import React from 'react';

import {IAssigneeResponse} from '@/data/api/types/task.type';

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
    <div className="kanban-task-item">
      <p className="task-name">{name}</p>
    </div>
  );
};

export default KanbanTaskItem;
