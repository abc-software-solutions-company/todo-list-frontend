import React, {ReactNode} from 'react';

interface IKanbanColumnDragWrapper {
  children: ReactNode;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onDragOver?: () => void;
}

export default function KanbanColumnDragWrapper({children}: IKanbanColumnDragWrapper) {
  return <div className="kanban-column-drag-wrapper">{children}</div>;
}
