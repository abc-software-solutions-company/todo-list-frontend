/* eslint-disable @typescript-eslint/no-unused-vars */
import {useDroppable} from '@dnd-kit/core';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import React, {useState} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';
import useTodolist from '@/states/todolist/use-todolist';
import useTodolistKanban from '@/states/todolist-kanban/use-kanban';

import KanbanTaskDragToColumn from './drag-to-column';
import KanbanTaskItem from './item';

interface IKanbanColumnBody {
  tasks: ITaskResponse[];
  statusId: number;
}

export default function KanbanColumnBody({tasks, statusId}: IKanbanColumnBody) {
  const {todolistKanban, setStatusActive} = useTodolistKanban();
  const {setNodeRef} = useDroppable({
    id: statusId.toString()
  });

  const {write} = useTodolist();

  return (
    <div className="kanban-column">
      <div className="tasks">
        {tasks && tasks.length > 0 ? (
          <SortableContext
            id={statusId.toString()}
            disabled={!write}
            items={tasks.map(task => task.id)}
            strategy={verticalListSortingStrategy}
          >
            <div ref={setNodeRef}>
              {tasks.map(task => (
                <KanbanTaskItem task={task} assigneeList={todolistKanban.members} key={task.id} />
              ))}
              <KanbanTaskDragToColumn statusId={statusId} />
            </div>
          </SortableContext>
        ) : (
          <SortableContext disabled={!write} items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
            <KanbanTaskDragToColumn statusId={statusId} />
          </SortableContext>
        )}
      </div>
    </div>
  );
}
