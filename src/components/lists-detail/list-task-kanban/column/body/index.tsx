/* eslint-disable @typescript-eslint/no-unused-vars */
import {useDroppable} from '@dnd-kit/core';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import React from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';
import useTodolist from '@/states/todolist/use-todolist';

import KanbanTaskItem from './item';
import KanbanTaskName from './item/task-name';
import KanbanTaskThumbnail from './item/thumbnail';

interface IKanbanColumnBody {
  // tasks: ITaskResponse[];
  tasks: any;
  id: any;
}

export default function KanbanColumnBody({id, tasks}: IKanbanColumnBody) {
  const {todolist} = useTodolist();

  const {write} = useTodolist();
  console.log('over here');

  console.log(tasks);

  return (
    <div className="kanban-column">
      <div className="tasks">
        <>
          <SortableContext id={id} disabled={!write} items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map(task => (
              <KanbanTaskItem task={task} assigneeList={todolist.members} key={task.id} />
            ))}
            {/* {tasks.map((task: React.Key | null | undefined) => (
              <>
                <div className="task-item">
                  <p>{JSON.stringify(task)}</p>
                </div>
              </>
            ))} */}
          </SortableContext>
        </>
      </div>
    </div>
  );
}
