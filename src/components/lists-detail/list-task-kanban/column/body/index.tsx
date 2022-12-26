/* eslint-disable @typescript-eslint/no-unused-vars */
import {useDroppable} from '@dnd-kit/core';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import React from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';
import useTodolist from '@/states/todolist/use-todolist';

import KanbanTaskItem from './item';
import style from './style.module.scss';

interface IKanbanColumnBody {
  tasks: ITaskResponse[];
  id: string;
}

export default function KanbanColumnBody({id, tasks}: IKanbanColumnBody) {
  const {setNodeRef} = useDroppable({id});

  const {write} = useTodolist();
  return (
    <SortableContext disabled={!write} id={id} items={tasks} strategy={verticalListSortingStrategy}>
      <ul className={style.droppable} ref={setNodeRef}>
        {tasks.map((task, idx: number) => (
          <>
            <KanbanTaskItem key={idx} task={task} />
          </>
        ))}
      </ul>
    </SortableContext>
  );
}
