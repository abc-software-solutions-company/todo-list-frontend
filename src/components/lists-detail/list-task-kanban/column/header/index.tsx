import React, {ReactNode} from 'react';

interface IKanBanColumnHeader {
  name: string;
  children: ReactNode;
}

export default function KanbanColumnHeader({children, name}: IKanBanColumnHeader) {
  return (
    <div className="kanban-header">
      <h2>{name}</h2>
      {children}
    </div>
  );
}
