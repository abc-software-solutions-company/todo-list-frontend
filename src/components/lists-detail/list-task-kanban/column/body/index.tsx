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
  statusId: number;
}

export default function KanbanColumnBody({tasks, statusId}: IKanbanColumnBody) {
  const {todolistKanban} = useTodolistKanban();
  const {write} = useTodolist();

  return (
    <div className="kanban-column">
      <div className="tasks">
        <SortableContext disabled={!write} items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
          <>
            {tasks.map(task => (
              <KanbanTaskItem task={task} assigneeList={todolistKanban.members} key={task.id} />
            ))}
            <KanbanTaskDragToColumn statusId={statusId} />
          </>
        </SortableContext>
      </div>
    </div>
  );
}
