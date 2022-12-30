import React, {ReactNode} from 'react';

interface IKanbanColumn {
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onDragOver?: () => void;
  children: ReactNode;
}

export default function KanbanColumn({children}: IKanbanColumn) {
  return <ul className="kanban-column-container bg-blue-400">{children}</ul>;
}
