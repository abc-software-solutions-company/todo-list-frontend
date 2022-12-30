import React, {ReactNode} from 'react';

interface IKanbanColumn {
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onDragOver?: () => void;
  children: ReactNode;
}

export default function KanbanColumn({children}: IKanbanColumn) {
  return <ul className="kanban-column-container h-full bg-amber-300">{children}</ul>;
}
