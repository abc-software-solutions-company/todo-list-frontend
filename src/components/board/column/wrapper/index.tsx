import React, {FC, ReactNode} from 'react';

interface IKanbanColumnWrapperProps {
  children: ReactNode;
  id: string;
}

const KanbanColumnWrapper: FC<IKanbanColumnWrapperProps> = ({children}) => {
  return <ul className="kanban-column-container h-full">{children}</ul>;
};

export default KanbanColumnWrapper;
