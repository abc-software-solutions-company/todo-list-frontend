import React, {ReactNode} from 'react';

import useTodolist from '@/states/todolist/use-todolist';

interface IKanbanColumn {
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onDragOver?: () => void;
  children: ReactNode;
  id: number;
}

export default function KanbanColumn({id, children}: IKanbanColumn) {
  const {setStatusActive} = useTodolist();
  return (
    <div className="kanban-column">
      {children}
      <div className="below-column w-full" onMouseLeave={() => setStatusActive(id)}></div>
    </div>
  );
}
