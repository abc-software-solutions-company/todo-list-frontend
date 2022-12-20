import {useRouter} from 'next/router';
import React from 'react';

import {ROUTES} from '@/configs/routes.config';

interface IKanbanTaskName {
  id: string;
  name: string;
}

export default function KanbanTaskName({id, name}: IKanbanTaskName) {
  const router = useRouter();
  return (
    <div className="kanban-task-name">
      <p className="task-name" onClick={() => router.push(`${ROUTES.TASK}/${id}`)}>
        {name}
      </p>
    </div>
  );
}
