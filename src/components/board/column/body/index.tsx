/* eslint-disable @typescript-eslint/no-unused-vars */
import {useDroppable} from '@dnd-kit/core';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import React from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';

import KanbanTaskItem from './item';
import style from './style.module.scss';

interface IKanbanColumnBody {
  tasks?: ITaskResponse[];
  id: string;
}

export default function KanbanColumnBody({id, tasks = []}: IKanbanColumnBody) {
  const {setNodeRef} = useDroppable({id});

  return (
    <SortableContext id={id} items={tasks} strategy={verticalListSortingStrategy}>
      <ul className={style.droppable} ref={setNodeRef}>
        {tasks.map((task, idx: number) => (
          <KanbanTaskItem key={idx} task={task} />
        ))}
      </ul>
    </SortableContext>
  );
}
