/* eslint-disable @typescript-eslint/no-unused-vars */
import {DndContext, DragOverlay, UniqueIdentifier} from '@dnd-kit/core';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import React, {useState} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';
import {useSensorGroup} from '@/lib/dnd-kit/sensor/sensor-group';
import useTodolistKanban from '@/states/todolist-kanban/use-kanban';

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
