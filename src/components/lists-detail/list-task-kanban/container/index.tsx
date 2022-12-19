import React from 'react';

import useTodolistKanban from '@/states/todolist-kanban/use-kanban';

import KanbanColumn from '../column';

const KanbanContainer = () => {
  const {todolistKanban} = useTodolistKanban();
  console.log('🚀 ~ file: index.tsx:9 ~ KanbanContainer ~ todolistKanban', todolistKanban);
  return (
    <>
      <div className="kanban-container grid grid-cols-6 gap-x-4 pt-6">
        {todolistKanban.status.map(column => (
          <KanbanColumn statusId={column.id} key={column.id} name={column.name} />
        ))}
      </div>
    </>
  );
};

export default KanbanContainer;
