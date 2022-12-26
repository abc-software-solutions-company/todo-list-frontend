/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-shadow */
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {arrayMove, sortableKeyboardCoordinates} from '@dnd-kit/sortable';
import React, {useState} from 'react';

import {IHandleDragStart} from '@/components/common/kanban/type';
import {insertAtIndex, moveBetweenContainers, removeAtIndex} from '@/components/common/kanban/utils/array';
import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {socketUpdateList} from '@/data/socket';
import {useSensorGroup} from '@/lib/dnd-kit/sensor/sensor-group';
import useTodolist from '@/states/todolist/use-todolist';
import {IndexStep} from '@/utils/constant';

import KanbanColumn from '../column';
import KanbanColumnBody from '../column/body';
import KanbanTaskItem from '../column/body/item';
import KanbanColumnHeader from '../column/header';
import style from './style.module.scss';

const KanbanContainer = () => {
  const {todolistKanban, setTodolistKanban} = useTodolist();
  // const [columnGroups, setcolumnGroups] = useState<any>(todolistKanban);
  const [activeId, setActiveId] = useState<ITaskResponse>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: {y: 10}
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: {y: 15, x: 5}
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragStart = ({active}: IHandleDragStart) => setActiveId(active.id);

  const handleDragCancel = () => setActiveId(null);

  const handleDragOver = ({active, over}: DragOverEvent) => {
    const overId = over?.id;
    if (!overId) {
      return;
    }

    const activeContainer = active.data.current?.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;

    if (activeContainer !== overContainer) {
      const data2 = (todolistKanban: {[x: string]: string | any[]}) => {
        const activeIndex = active.data.current?.sortable.index;
        const overIndex =
          over.id in todolistKanban ? todolistKanban[overContainer].length + 1 : over.data.current?.sortable.index;

        return moveBetweenContainers(todolistKanban, activeContainer, activeIndex, overContainer, overIndex, active.id);
      };

      setTodolistKanban(data2(todolistKanban));
    }
  };

  const handleDragEnd = ({active, over}: DragEndEvent) => {
    if (!over) {
      setActiveId(null);
      return;
    }
    // console.log('Active ID');
    // console.log(JSON.parse(active?.id.toString()));
    // console.log('Over ID');
    // console.log(JSON.parse(over?.id.toString()));
    console.log(active.id !== over.id);

    if (active.id !== over.id) {
      const activeContainer = active.data.current?.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current?.sortable.index;
      const overIndex =
        over.id in todolistKanban ? todolistKanban[overContainer].length + 1 : over.data.current?.sortable.index;
      let newItems;
      const data1 = (todolistKanban: {[x: string]: any}) => {
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
      };

      setTodolistKanban(data1(todolistKanban));
    }
  };

  if (todolistKanban)
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
              {Object.keys(todolistKanban).map((column, idx) => (
                <KanbanColumn key={idx}>
                  <KanbanColumnHeader name={Object.keys(todolistKanban)[idx]} />
                  <KanbanColumnBody id={column} tasks={todolistKanban[column]} />
                </KanbanColumn>
              ))}
              <DragOverlay>{activeId ? <KanbanTaskItem task={activeId} /> : null}</DragOverlay>
            </DndContext>
          </div>
        </div>
      </>
    );

  return null;
};

export default KanbanContainer;
