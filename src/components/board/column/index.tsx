import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import React, {FC, memo, ReactNode} from 'react';

interface IKanbanColumn {
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onDragOver?: () => void;
  children: ReactNode;
  id: string;
}

const KanbanColumn: FC<IKanbanColumn> = ({children, id}) => {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id});
  const styleDnd = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };
  return (
    <ul className="kanban-column-container h-full" ref={setNodeRef} style={styleDnd} {...attributes} {...listeners}>
      {children}
    </ul>
  );
};

export default memo(KanbanColumn);
