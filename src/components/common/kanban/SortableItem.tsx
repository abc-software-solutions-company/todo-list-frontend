import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import React from 'react';

import Item from './Item';

interface ISortableItemProp {
  id: any;
}
const SortableItem = ({id}: ISortableItemProp) => {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <li style={style} ref={setNodeRef} {...attributes} {...listeners}>
      <Item id={id} dragOverlay={undefined} />
    </li>
  );
};

export default SortableItem;
