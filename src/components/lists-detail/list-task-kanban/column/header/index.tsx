import React, {ReactNode} from 'react';

interface IKanBanColumnHeader {
  name: string;
  children: ReactNode;
}

export default function KanbanColumnHeader({children, name}: IKanBanColumnHeader) {
  return (
    <div className="kanban-header">
      <h3 className="text-center">{name}</h3>
      {children}
    </div>
  );
}
