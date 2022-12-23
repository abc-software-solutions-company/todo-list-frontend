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
    <div className="kanban-column" onMouseOver={() => setStatusActive(id)}>
      {children}
      {/* <div className="below-column h-full w-full bg-amber-300" onMouseLeave={() => setStatusActive(id)}></div> */}
    </div>
  );
}
