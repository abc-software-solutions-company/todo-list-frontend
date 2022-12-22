/* eslint-disable @typescript-eslint/no-unused-vars */
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import React from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';
import useTodolist from '@/states/todolist/use-todolist';
import useTodolistKanban from '@/states/todolist-kanban/use-kanban';

import KanbanTaskDragToColumn from './drag-to-column';
import KanbanTaskItem from './item';

interface IKanbanColumnBody {
  tasks: ITaskResponse[];
}

export default function KanbanColumnBody({tasks}: IKanbanColumnBody) {
  const {todolistKanban, setStatusActive} = useTodolistKanban();
  const statusId = tasks[0].statusId;
  const {write} = useTodolist();

  return (
    <div className="kanban-column">
      <div className="tasks">
        {tasks && tasks.length > 0 ? (
          <>
            <SortableContext
              disabled={!write}
              items={tasks.map(task => task.id)}
              strategy={verticalListSortingStrategy}
            >
              {tasks.map(task => (
                <KanbanTaskItem task={task} assigneeList={todolistKanban.members} key={task.id} />
              ))}
            </SortableContext>
            <KanbanTaskDragToColumn statusId={statusId} />
          </>
        ) : (
          <>
            <SortableContext
              disabled={!write}
              items={tasks.map(task => task.id)}
              strategy={verticalListSortingStrategy}
            >
              <KanbanTaskDragToColumn statusId={statusId} />
            </SortableContext>
          </>
        )}
      </div>
    </div>
  );
}
