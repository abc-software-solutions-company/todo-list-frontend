import React from 'react';

import KanbanColumn from '../column';

export default function KanbanContainer() {
  return (
    <div className="kanban-container grid grid-cols-6 gap-x-4 pt-6">
      <KanbanColumn />
    </div>
  );
}
