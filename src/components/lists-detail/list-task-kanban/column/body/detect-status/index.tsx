import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import React from 'react';

interface IKanbanTaskItemEmpty {
  statusId: number;
}

const KanbanTaskItemEmpty = ({statusId}: IKanbanTaskItemEmpty) => {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: statusId});

  const styleDnd = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div ref={setNodeRef} style={styleDnd} {...attributes} {...listeners}>
      <>{statusId}</>
    </div>
  );
};

export default KanbanTaskItemEmpty;
