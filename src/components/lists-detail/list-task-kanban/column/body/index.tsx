/* eslint-disable @typescript-eslint/no-unused-vars */
import {useDroppable} from '@dnd-kit/core';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import React from 'react';

import KanbanColumnHeader from '@/components/common/kanban/components/column-header';
import SortableItem from '@/components/common/kanban/components/sortable-item';
import {ITaskResponse} from '@/data/api/types/task.type';
import useTodolist from '@/states/todolist/use-todolist';

import KanbanTaskItem from './item';
import KanbanTaskName from './item/task-name';
import KanbanTaskThumbnail from './item/thumbnail';
import style from './style.module.scss';

interface IKanbanColumnBody {
  // tasks: ITaskResponse[];
  tasks: any;
  id: any;
}

export default function KanbanColumnBody({id, tasks}: IKanbanColumnBody) {
  const {todolist} = useTodolist();

  const {setNodeRef} = useDroppable({id});

  const {write} = useTodolist();
  console.log('over here');

  console.log(tasks);

  return (
    <div className="kanban-column">
      <div className="tasks">
        <SortableContext id={id} items={tasks} strategy={verticalListSortingStrategy}>
          <ul className={style.droppable} ref={setNodeRef}>
            {tasks.map((task: React.Key | null | undefined) => (
              <>
                {/* <SortableItem key={item} id={item} /> */}
                <KanbanTaskItem task={task} />
              </>
            ))}
          </ul>
        </SortableContext>
      </div>
    </div>
  );
}
