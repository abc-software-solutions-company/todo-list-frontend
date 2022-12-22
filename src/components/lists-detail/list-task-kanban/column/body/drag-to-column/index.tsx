import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import React from 'react';

interface IKanbanTaskDragToColumn {
  statusId: number;
}

const KanbanTaskDragToColumn = ({statusId}: IKanbanTaskDragToColumn) => {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: statusId});

  const styleDnd = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div
      ref={setNodeRef}
      className="kanban-task-drag-to-column absolute h-full w-32"
      style={styleDnd}
      {...attributes}
      {...listeners}
    >
      <div className="text-transparent">{statusId}</div>
    </div>
  );
};

export default KanbanTaskDragToColumn;
