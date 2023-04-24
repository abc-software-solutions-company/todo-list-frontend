import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import React, {FC, memo, ReactNode} from 'react';

interface IKanbanColumnWrapperProps {
  children: ReactNode;
  columnId: string;
}

const KanbanColumnWrapper: FC<IKanbanColumnWrapperProps> = ({columnId, children}) => {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: columnId});
  const style = {transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1};

  return (
    <ul className="h-full" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="h-fit">{children}</div>
    </ul>
  );
};

export default memo(KanbanColumnWrapper);
