import React, {ReactNode} from 'react';

interface IKanbanColumn {
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onDragOver?: () => void;
  children: ReactNode;
}

export default function KanbanColumn({children}: IKanbanColumn) {
  return <div className="kanban-column">{children}</div>;
}
