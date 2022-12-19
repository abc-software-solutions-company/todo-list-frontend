import React from 'react';

import KanbanColumnBody from './body';
import KanbanColumnHeader from './header';

interface IKanbanColumn {
  statusId: number;
  name: string;
}

export default function KanbanColumn({statusId, name}: IKanbanColumn) {
  return (
    <div className="kanban-column">
      <KanbanColumnHeader name={name} statusId={statusId} />
      <KanbanColumnBody statusId={statusId} />
    </div>
  );
}
