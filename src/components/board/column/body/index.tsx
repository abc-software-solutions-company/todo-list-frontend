import {useDroppable} from '@dnd-kit/core';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import React from 'react';

import KanbanTaskItem from './item';
import style from './style.module.scss';

interface IKanbanColumnBody {
  tasks?: string[];
  id: string;
}

export default function KanbanColumnBody({id, tasks = []}: IKanbanColumnBody) {
  const {setNodeRef} = useDroppable({id});

  return (
    <SortableContext id={id} items={tasks} strategy={verticalListSortingStrategy}>
      <ul className={style['column-body']} ref={setNodeRef}>
        {tasks.map((task, idx: number) => (
          <KanbanTaskItem key={idx} id={task} />
        ))}
      </ul>
    </SortableContext>
  );
}
