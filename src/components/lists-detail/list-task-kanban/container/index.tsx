import React, {ReactNode} from 'react';

interface IKanbanContainer {
  children: ReactNode;
}

const KanbanContainer = ({children}: IKanbanContainer) => {
  return (
    <>
      <div className="kanban-container grid grid-cols-6 gap-x-4 pt-6">{children}</div>
    </>
  );
};

export default KanbanContainer;
