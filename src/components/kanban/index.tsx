import {DndContext, DragStartEvent, MeasuringStrategy, MouseSensor, TouchSensor, UniqueIdentifier, useSensor, useSensors} from '@dnd-kit/core';
import {SortableContext} from '@dnd-kit/sortable';
import {FC, useEffect, useState} from 'react';

import {IStatus} from '@/data/api/types/todolist.type';
import useTodolist from '@/states/todolist/use-todolist';

import Column from './column';

interface IProps {
  id: string;
}

const Kanban: FC<IProps> = ({id}) => {
  const {todolist, initial} = useTodolist();
  const [columns, setColumns] = useState<IStatus[]>([]);

  const containers = Object.keys(columns) as UniqueIdentifier[];
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const isSortingContainer = activeId ? containers.includes(activeId) : false;

  const measuring = {
    droppable: {
      strategy: MeasuringStrategy.Always
    }
  };

  const onDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  useEffect(() => {
    if (todolist) {
      setColumns(todolist.status);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todolist]);

  useEffect(() => {
    initial(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!todolist) return null;

  return (
    <>
      <DndContext {...{sensors, measuring, onDragStart}}>
        <div className=" my-5 grid auto-cols-fr grid-flow-col">
          <SortableContext items={todolist.status.map(e => e.id)}>
            {columns.length > 0 &&
              columns.map(status => (
                <Column key={status.id} disable={isSortingContainer} status={status} items={todolist.tasks.filter(e => e.statusId == status.id)} />
              ))}
          </SortableContext>
        </div>
      </DndContext>
    </>
  );
};

export default Kanban;
