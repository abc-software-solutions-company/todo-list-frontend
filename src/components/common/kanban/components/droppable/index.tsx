import {useDroppable} from '@dnd-kit/core';
import {rectSortingStrategy, SortableContext} from '@dnd-kit/sortable';
import React from 'react';

import SortableItem from '../sortable-item';
import style from './style.module.scss';

interface IDroppableProp {
  id: any;
  items: any;
  activeId: any;
  columnName: any;
}

const Droppable = ({id, items, columnName}: IDroppableProp) => {
  const {setNodeRef} = useDroppable({id});

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <ul className={style.droppable} ref={setNodeRef}>
        <p>{columnName}</p>
        {items.map((item: React.Key | null | undefined) => (
          <SortableItem key={item} id={item} />
        ))}
      </ul>
    </SortableContext>
  );
};

export default Droppable;
