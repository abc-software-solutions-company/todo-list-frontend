/* eslint-disable @typescript-eslint/no-unused-vars */
import {useDroppable} from '@dnd-kit/core';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import React from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';
import useTodolist from '@/states/todolist/use-todolist';

import KanbanTaskItem from './item';

interface IKanbanColumnBody {
  tasks: ITaskResponse[];
  statusId: number;
}

export default function KanbanColumnBody({tasks, statusId}: IKanbanColumnBody) {
  const {todolist} = useTodolist();
  const {setNodeRef} = useDroppable({
    id: statusId.toString()
  });

  const {write} = useTodolist();

  return (
    <div className="kanban-column">
      <div className="tasks">
        {tasks && tasks.length > 0 && (
          <>
            <SortableContext
              disabled={!write}
              items={tasks.map(task => task.id)}
              strategy={verticalListSortingStrategy}
            >
              {tasks.map(task => (
                <KanbanTaskItem task={task} assigneeList={todolist.members} key={task.id} />
              ))}
            </SortableContext>
          </>
        )}
      </div>
    </div>
  );
}
