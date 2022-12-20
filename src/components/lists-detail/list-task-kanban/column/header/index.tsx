import React from 'react';

interface IKanbanColumnHeader {
  name: string;
}
export default function KanbanColumnHeader({name}: IKanbanColumnHeader) {
  return (
    <div className="kanban-column-header">
      <h3 className="text-center">{name}</h3>
    </div>
  );
}
