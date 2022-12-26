import {useDroppable} from '@dnd-kit/core';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import React from 'react';

import useTodolist from '@/states/todolist/use-todolist';

import KanbanColumnHeader from '../column-header';
// import useTodolist from '@/states/todolist/use-todolist';
import SortableItem from '../sortable-item';
import style from './style.module.scss';

interface IDroppableProp {
  id: any;
  items: any;
}

const KanbanColumn = ({id, items}: IDroppableProp) => {
  const {statusList} = useTodolist();

  const {setNodeRef} = useDroppable({id});

  return (
    <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
      <ul className={style.droppable} ref={setNodeRef}>
        <KanbanColumnHeader name={id} />

        <div className="column-body">
          {items.map((item: React.Key | null | undefined) => (
            <>
              <div className="task-item">
                <SortableItem key={item} id={item} />
              </div>
            </>
          ))}
        </div>
      </ul>
    </SortableContext>
  );
};

export default KanbanColumn;
