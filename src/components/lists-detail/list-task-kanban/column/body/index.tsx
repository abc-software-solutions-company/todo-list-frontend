/* eslint-disable @typescript-eslint/no-unused-vars */
import {DndContext, DragOverlay, UniqueIdentifier} from '@dnd-kit/core';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import React, {useState} from 'react';

import TaskItem from '@/components/common/task-item';
import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';
import {IStatus, ITodolistResponse} from '@/data/api/types/todolist.type';
import {socketUpdateList} from '@/data/socket';
import {useSensorGroup} from '@/lib/dnd-kit/sensor/sensor-group';
import useTodolist from '@/states/todolist/use-todolist';
import useTodolistKanban from '@/states/todolist-kanban/use-kanban';
import {IndexStep} from '@/utils/constant';

interface IKanbanColumnBody {
  tasks: ITaskResponse[];
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export default function KanbanColumnBody({tasks, onDragEnd, onDragStart}: IKanbanColumnBody) {
  const {write} = useTodolistKanban();

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const modifiers = [restrictToVerticalAxis];

  const sensors = useSensorGroup();

  return (
    <div className="kanban-column">
      <DndContext {...{sensors, modifiers, onDragEnd, onDragStart}}>
        <div className="tasks">
          {tasks && tasks.length === 0 && <span className="empty">Empty list</span>}
          {tasks && tasks.length > 0 && (
            <SortableContext
              disabled={!write}
              items={tasks.map(task => task.id)}
              strategy={verticalListSortingStrategy}
            >
              {tasks.map(task => (
                <>
                  <p>{task.name}</p>
                </>
              ))}
            </SortableContext>
          )}
          <DragOverlay>
            {activeId ? (
              <>
                <p>{tasks!.filter(e => e.id === activeId)[0].name}</p>
              </>
            ) : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  );
}
