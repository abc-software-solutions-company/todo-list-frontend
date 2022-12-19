import React from 'react';

import KanbanColumnBody from './body';
import KanbanColumnHeader from './header';

export default function KanbanColumn() {
  return (
    <div className="kanban-column">
      <KanbanColumnHeader />
      <KanbanColumnBody statusId={0} />
    </div>
  );
}
