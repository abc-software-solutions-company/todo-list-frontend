import React, {ReactNode} from 'react';

interface IKanbanContainer {
  children: ReactNode;
}

export default function KanbanContainer({children}: IKanbanContainer) {
  return <div className="kanban-container flex">{children}</div>;
}
