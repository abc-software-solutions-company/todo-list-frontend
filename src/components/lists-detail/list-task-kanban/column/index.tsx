import React from 'react';

import useTodolistKanban from '@/states/todolist-kanban/use-kanban';

import KanbanColumnBody from './body';
import KanbanColumnHeader from './header';

interface IKanbanColumn {
  id: number;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onDragOver?: () => void;
}

export default function KanbanColumn({id}: IKanbanColumn) {
  const {todolistKanban} = useTodolistKanban();
  const {name, tasks} = todolistKanban.status.filter(x => x.id == id)[0];
  return (
    <div className="kanban-column">
      <KanbanColumnHeader name={name} />
      <KanbanColumnBody tasks={tasks || []} />
    </div>
  );
}
