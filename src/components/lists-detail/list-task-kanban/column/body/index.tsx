/* eslint-disable @typescript-eslint/no-unused-vars */
import {DndContext, DragOverlay, UniqueIdentifier} from '@dnd-kit/core';
import {SortableContext} from '@dnd-kit/sortable';
import React, {useState} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';
import {useSensorGroup} from '@/lib/dnd-kit/sensor/sensor-group';
import useTodolistKanban from '@/states/todolist-kanban/use-kanban';

import KanbanTaskItem from './item';

interface IKanbanColumnBody {
  tasks: ITaskResponse[];
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export default function KanbanColumnBody({tasks, onDragEnd, onDragStart}: IKanbanColumnBody) {
  const {write} = useTodolistKanban();

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensorGroup();

  return (
    <div className="kanban-column">
      <DndContext {...{sensors, onDragEnd, onDragStart}}>
        <div className="tasks">
          {tasks && tasks.length > 0 && (
            <SortableContext disabled={!write} items={tasks.map(task => task.id)}>
              {tasks.map(task => (
                <>
                  <KanbanTaskItem name={task.name} />
                </>
              ))}
            </SortableContext>
          )}
          <DragOverlay>
            {activeId ? (
              <>
                <KanbanTaskItem name={tasks!.filter(e => e.id === activeId)[0].name} />
              </>
            ) : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  );
}
