/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-shadow */
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {arrayMove, sortableKeyboardCoordinates} from '@dnd-kit/sortable';
import React, {ReactNode, useState} from 'react';

import {IHandleDragStart} from '@/components/common/kanban/type';
import {insertAtIndex, removeAtIndex} from '@/components/common/kanban/utils/array';
import api from '@/data/api';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {socketUpdateList} from '@/data/socket';
import {useSensorGroup} from '@/lib/dnd-kit/sensor/sensor-group';
import useTodolist from '@/states/todolist/use-todolist';
import {IndexStep} from '@/utils/constant';

import KanbanTaskItem from '../column/body/item';
import style from './style.module.scss';

interface IKanbanContainer {
  children: ReactNode;
}

const KanbanContainer = ({children}: IKanbanContainer) => {
  const {todolistKanban, setTodolistKanban} = useTodolist();
  const [itemGroups, setItemGroups] = useState<any>(todolistKanban);

  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragStart = ({active}: IHandleDragStart) => setActiveId(active.id);

  const handleDragCancel = () => setActiveId(null);

  const handleDragOver = ({active, over}: DragOverEvent) => {
    // console.log(over?.data);

    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer = active.data.current?.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;

    if (activeContainer !== overContainer) {
      setItemGroups((todolistKanban: {[x: string]: string | any[]}) => {
        const activeIndex = active.data.current?.sortable.index;
        const overIndex =
          over.id in todolistKanban ? todolistKanban[overContainer].length + 1 : over.data.current?.sortable.index;

        return moveBetweenContainers(todolistKanban, activeContainer, activeIndex, overContainer, overIndex, active.id);
      });
    }
  };

  const handleDragEnd = ({active, over}: DragEndEvent) => {
    if (!over) {
      setActiveId(null);
      return;
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current?.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current?.sortable.index;
      const overIndex =
        over.id in todolistKanban ? todolistKanban[overContainer].length + 1 : over.data.current?.sortable.index;
      let newItems;

      setItemGroups((todolistKanban: {[x: string]: any}) => {
        if (activeContainer === overContainer) {
          newItems = {
            ...todolistKanban,
            [overContainer]: arrayMove(todolistKanban[overContainer], activeIndex, overIndex)
          };
        } else {
          newItems = moveBetweenContainers(
            todolistKanban,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            active.id
          );
        }

        return newItems;
      });
    }

    setActiveId(null);
    setTodolistKanban(itemGroups);
  };

  const moveBetweenContainers = (
    items: {[x: string]: any},
    activeContainer: string | number,
    activeIndex: any,
    overContainer: string | number,
    overIndex: any,
    item: any
  ) => {
    return {
      ...items,
      [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
      [overContainer]: insertAtIndex(items[overContainer], overIndex, item)
    };
  };

  return (
    <>
      <div className={style['kanban-container']}>
        <div className="kanban-container-scroll">
          <DndContext
            autoScroll={true}
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragCancel={handleDragCancel}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            {children}
            <DragOverlay>
              {activeId ? (
                <KanbanTaskItem
                  assigneeList={todolistKanban.members}
                  task={todolistKanban.tasks!.filter(e => e.id === activeId)[0]}
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </>
  );
};

export default KanbanContainer;
