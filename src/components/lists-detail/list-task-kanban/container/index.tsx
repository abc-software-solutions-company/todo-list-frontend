import React from 'react';

import useTodolistKanban from '@/states/todolist-kanban/use-kanban';

import KanbanColumn from '../column';

const KanbanContainer = () => {
  const {todolistKanban} = useTodolistKanban();
  return (
    <>
      <div className="kanban-container grid grid-cols-6 gap-x-4 pt-6">
        {todolistKanban.status.map(column => (
          <KanbanColumn id={column.id} key={column.id} />
        ))}
      </div>
    </>
  );
};

export default KanbanContainer;
