/* eslint-disable @typescript-eslint/no-unused-vars */
import {DndContext, DragOverlay, DragStartEvent, UniqueIdentifier} from '@dnd-kit/core';
import {SortableContext} from '@dnd-kit/sortable';
import React, {useState} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';
import {useSensorGroup} from '@/lib/dnd-kit/sensor/sensor-group';
import useTodolistKanban from '@/states/todolist-kanban/use-kanban';

import KanbanTaskItem from './item';

interface IKanbanColumnBody {
  tasks: ITaskResponse[];
}

export default function KanbanColumnBody({tasks}: IKanbanColumnBody) {
  const {write} = useTodolistKanban();

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensorGroup();

  const onDragStart = ({active}: DragStartEvent) => {
    if (active) setActiveId(active.id);
  };

  const onDragEnd = () => {};

  return (
    <div className="kanban-column">
      <DndContext {...{sensors, onDragEnd, onDragStart}}>
        <div className="tasks">
          {tasks && tasks.length > 0 && (
            <SortableContext disabled={!write} items={tasks.map(task => task.id)}>
              {tasks.map(task => (
                <KanbanTaskItem
                  priority={task.priority}
                  thumbnail={'https://www.w3schools.com/html/pic_trulli.jpg'}
                  dueDate={task.dueDate || new Date('2022-03-25')}
                  key={task.id}
                  columnId={task.statusId}
                  name={task.name}
                  id={task.id}
                />
              ))}
            </SortableContext>
          )}
          <DragOverlay>
            {activeId ? (
              <KanbanTaskItem
                priority={tasks!.filter(e => e.id === activeId)[0].priority}
                dueDate={tasks!.filter(e => e.id === activeId)[0].dueDate || new Date('2022-03-25')}
                thumbnail={'https://www.w3schools.com/html/pic_trulli.jpg'}
                name={tasks!.filter(e => e.id === activeId)[0].name}
                id={tasks!.filter(e => e.id === activeId)[0].id}
                columnId={tasks!.filter(e => e.id === activeId)[0].statusId}
              />
            ) : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  );
}
