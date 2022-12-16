import React, {ReactNode} from 'react';

interface IKanbanColumn {
  children: ReactNode;
}

export default function KanbanColumn({children}: IKanbanColumn) {
  return <div className="kanban-column">{children}</div>;
}
