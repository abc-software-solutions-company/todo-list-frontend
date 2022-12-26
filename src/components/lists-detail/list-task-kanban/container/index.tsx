/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-shadow */
import {DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent} from '@dnd-kit/core';
import {arrayMove} from '@dnd-kit/sortable';
import React, {useState} from 'react';

import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';
import {socketUpdateList} from '@/data/socket';
import {useSensorGroup} from '@/lib/dnd-kit/sensor/sensor-group';
import useTodolist from '@/states/todolist/use-todolist';
import {IndexStep} from '@/utils/constant';
import {moveBetweenContainers} from '@/utils/kanban/array';

import KanbanColumn from '../column';
import KanbanColumnBody from '../column/body';
import KanbanTaskItem from '../column/body/item';
import KanbanColumnFooter from '../column/footer';
import KanbanColumnHeader from '../column/header';
import style from './style.module.scss';

const KanbanContainer = () => {
  const {todolistKanban, todolist, setTodolistKanban, statusList} = useTodolist();
  const [activeId, setActiveId] = useState<ITaskResponse>();
  const [statusActive, setStatusActive] = useState(0);
  const [isDragToColumn, setIsDragToColumn] = useState(false);

  const sensors = useSensorGroup();

  const apiUpdateTaskPosition = (activeTask: any, overTask: any) => {
    let newTaskIndex: number | undefined;
    let reindexAll = false;
    const limitDifferenceIndex = 32;
    const listIndex = todolist.tasks.map(e => e.index);
    const maxIndex = Math.max(...listIndex);
    const minIndex = Math.min(...listIndex);
    const taskBefore: ITaskResponse = activeTask;
    const taskAfter: ITaskResponse = overTask;

    if (!taskBefore || !taskAfter) {
      const taskNext = taskBefore || taskAfter;

      const indexNext = Number(taskNext.index);
      if (indexNext === minIndex) newTaskIndex = Math.round(minIndex / 2);
      if (indexNext === maxIndex) newTaskIndex = maxIndex + IndexStep;
      if (newTaskIndex && newTaskIndex <= limitDifferenceIndex) reindexAll = true;
    } else {
      const indexBefore = Number(taskBefore.index);
      const indexAfter = Number(taskAfter.index);
      newTaskIndex = Math.round((indexBefore + indexAfter) / 2);
      if (Math.abs(taskBefore.index - taskAfter.index) < limitDifferenceIndex * 2) reindexAll = true;
    }

    const resetIndex = () => {
      if (reindexAll) api.task.reindexAll({todolistId: todolist.id});
    };

    api.task
      .update({id: taskBefore.id, index: newTaskIndex, statusId: Number(statusActive)})
      .then(() => {
        console.log('Drag kanban success');
      })
      .then(() => setStatusActive(0))
      .then(socketUpdateList)
      .then(resetIndex);
  };

  const handleDragStart = ({active}: any) => setActiveId(active.id);

  const handleDragCancel = () => setActiveId(undefined);

  const handleDragOver = ({active, over}: DragOverEvent) => {
    const overId = over?.id;
    if (!overId) {
      return;
    }

    const activeContainer = active.data.current?.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;

    if (activeContainer !== overContainer) {
      console.log('Drag to other column');

      const updatePosition = (todolistKanban: {[x: string]: string | any[]}) => {
        const activeIndex = active.data.current?.sortable.index;
        const overIndex =
          over.id in todolistKanban ? todolistKanban[overContainer].length + 1 : over.data.current?.sortable.index;

        return moveBetweenContainers(todolistKanban, activeContainer, activeIndex, overContainer, overIndex, active.id);
      };
      setTodolistKanban(updatePosition(todolistKanban));
      setStatusActive(statusList.filter(e => e.name == overContainer)[0].id);
      setIsDragToColumn(true);
    }
  };

  const handleDragEnd = ({active, over}: DragEndEvent) => {
    if (!over) {
      setActiveId(undefined);
      return;
    }
    const taskKanbanActive = JSON.parse(active.id.toString());

    if (active.id !== over.id && !isDragToColumn) {
      const taskKanbanOver = JSON.parse(over.id.toString());
      console.log('Drag on the same column');
      const activeContainer = active.data.current?.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current?.sortable.index;
      const overIndex =
        over.id in todolistKanban ? todolistKanban[overContainer].length + 1 : over.data.current?.sortable.index;
      let newItems;
      const updatePosition = (todolistKanban: {[x: string]: any}) => {
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

      setTodolistKanban(updatePosition(todolistKanban));
      setStatusActive(statusList.filter(e => e.name == activeContainer)[0].id);
      apiUpdateTaskPosition(taskKanbanActive, taskKanbanOver);
    } else {
      const taskKanbanActive = JSON.parse(active.id.toString());
      apiUpdateTaskPosition(taskKanbanActive, null);
    }
    setIsDragToColumn(false);
  };

  if (todolistKanban)
    return (
      <>
        <div className={style['kanban-container']}>
          <div className="kanban-container-scroll">
            <DndContext
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragCancel={handleDragCancel}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
            >
              {Object.keys(todolistKanban).map((columnId, idx) => (
                <KanbanColumn key={idx}>
                  <KanbanColumnHeader color={statusList[idx].color} name={statusList[idx].name} />
                  <KanbanColumnBody id={columnId} tasks={todolistKanban[columnId]} />
                  <KanbanColumnFooter id={statusList[idx].id} />
                </KanbanColumn>
              ))}
              <DragOverlay>
                {activeId ? (
                  <div className="task-kanban-overlay list-none">
                    <KanbanTaskItem task={activeId} />
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>
        </div>
      </>
    );

  return null;
};

export default KanbanContainer;
