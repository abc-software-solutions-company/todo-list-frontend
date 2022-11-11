import './Droppable.css';

import {useDroppable} from '@dnd-kit/core';
import {rectSortingStrategy, SortableContext} from '@dnd-kit/sortable';
import React from 'react';

import SortableItem from './SortableItem';

interface IDroppableProp {
  id: any;
  items: any;
}

const Droppable = ({id, items}: IDroppableProp) => {
  const {setNodeRef} = useDroppable({id});

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <ul className="droppable" ref={setNodeRef}>
        {items.map((item: React.Key | null | undefined) => (
          <SortableItem key={item} id={item} />
        ))}
      </ul>
    </SortableContext>
  );
};

export default Droppable;
