import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import React from 'react';

// import useTodolist from '@/states/todolist/use-todolist';
import Item from '../item';

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
    <>
      <li style={style} ref={setNodeRef} {...attributes} {...listeners}>
        {/* <p>{todolist.tasks.filter(e => e.id == id)[0].name}</p> */}

        <Item id={id} dragOverlay={undefined} />
      </li>
    </>
  );
};

export default SortableItem;
