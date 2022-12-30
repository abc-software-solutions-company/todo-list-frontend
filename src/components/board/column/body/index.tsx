/* eslint-disable @typescript-eslint/no-unused-vars */
import {useDroppable} from '@dnd-kit/core';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import React, {useEffect, useState} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';

import KanbanColumnFooter from '../footer';
import KanbanTaskItem from './item';
import style from './style.module.scss';

interface IKanbanColumnBody {
  tasks?: ITaskResponse[];
  id: string;
}

export default function KanbanColumnBody({id, tasks = []}: IKanbanColumnBody) {
  const {setNodeRef} = useDroppable({id});
  const [windowHeight, setWindowHeight] = useState(550);

  useEffect(() => {
    if (window) {
      window.addEventListener('resize', () => {
        if (windowHeight > 0) setWindowHeight(window.innerHeight * 0.7);
      });
    }
  }, []);

  return (
    <SortableContext id={id} items={tasks} strategy={verticalListSortingStrategy}>
      <ul className={style['column-body']} ref={setNodeRef} style={{maxHeight: windowHeight}}>
        {tasks.map((task, idx: number) => (
          <KanbanTaskItem key={idx} task={task} />
        ))}
        <div className="add-task">
          <KanbanColumnFooter id={Number(id)} />
        </div>
      </ul>
    </SortableContext>
  );
}
