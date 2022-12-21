/* eslint-disable @typescript-eslint/no-unused-vars */
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import React from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';
import useTodolist from '@/states/todolist/use-todolist';
import useTodolistKanban from '@/states/todolist-kanban/use-kanban';

import KanbanTaskItem from './item';
import style from './style.module.scss';

interface IKanbanColumnBody {
  tasks: ITaskResponse[];
  statusId: number;
}

export default function KanbanColumnBody({tasks, statusId}: IKanbanColumnBody) {
  const {todolistKanban} = useTodolistKanban();
  const {write} = useTodolist();

  return (
    <div className={style['kanban-column']}>
      <div className="tasks">
        {tasks && (
          <SortableContext disabled={!write} items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
            {tasks.map(task => (
              <KanbanTaskItem task={task} assigneeList={todolistKanban.members} key={task.id} />
            ))}
          </SortableContext>
        )}
      </div>
    </div>
  );
}
