/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-shadow */
import {DndContext, DragOverlay, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core';
import {sortableKeyboardCoordinates} from '@dnd-kit/sortable';
import React, {useState} from 'react';

import Droppable from './components/droppable';
import Item from './components/item';
import style from './style.module.scss';
import {IHandleDragEnd, IHandleDragOver, IHandleDragStart} from './type';
import {arrayMove, insertAtIndex, removeAtIndex} from './utils/array';

interface IKanbanProp {
  data: any;
}

function Kanban({data}: IKanbanProp) {
  const [itemGroups, setItemGroups] = useState<any>(data);
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

  const handleDragOver = ({active, over}: IHandleDragOver) => {
    console.log(over?.data);

    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;

    if (activeContainer !== overContainer) {
      setItemGroups((itemGroups: {[x: string]: string | any[]}) => {
        const activeIndex = active.data.current.sortable.index;
        const overIndex = over.id in itemGroups ? itemGroups[overContainer].length + 1 : over.data.current.sortable.index;

        return moveBetweenContainers(itemGroups, activeContainer, activeIndex, overContainer, overIndex, active.id);
      });
    }
  };

  const handleDragEnd = ({active, over}: IHandleDragEnd) => {
    if (!over) {
      setActiveId(null);
      return;
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.id in itemGroups ? itemGroups[overContainer].length + 1 : over.data.current.sortable.index;

      setItemGroups((itemGroups: {[x: string]: any}) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...itemGroups,
            [overContainer]: arrayMove(itemGroups[overContainer], activeIndex, overIndex)
          };
        } else {
          newItems = moveBetweenContainers(itemGroups, activeContainer, activeIndex, overContainer, overIndex, active.id);
        }

        return newItems;
      });
    }

    setActiveId(null);
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
    <DndContext
      autoScroll={true}
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className={style.container}>
        {Object.keys(itemGroups).map((group, idx) => (
          <>
            {idx}
            <Droppable id={group} items={itemGroups[group]} activeId={activeId} key={group} />
          </>
        ))}
      </div>
      <DragOverlay>{activeId ? <Item id={activeId} dragOverlay /> : null}</DragOverlay>
    </DndContext>
  );
}

export default Kanban;
