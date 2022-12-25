import {useDroppable} from '@dnd-kit/core';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import React from 'react';

import SortableItem from '../sortable-item';
import style from './style.module.scss';

interface IDroppableProp {
  id: any;
  items: any;
  activeId: any;
}

const Droppable = ({id, items}: IDroppableProp) => {
  const {setNodeRef} = useDroppable({id});

  return (
    <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
      <ul className={style.droppable} ref={setNodeRef}>
        {items.map((item: React.Key | null | undefined) => (
          <SortableItem key={item} id={item} />
        ))}
      </ul>
    </SortableContext>
  );
};

export default Droppable;
