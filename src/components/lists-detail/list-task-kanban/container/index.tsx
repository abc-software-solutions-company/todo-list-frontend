import {DndContext, DragEndEvent, DragOverlay, DragStartEvent, UniqueIdentifier} from '@dnd-kit/core';
import {arrayMove} from '@dnd-kit/sortable';
import React, {ReactNode, useState} from 'react';

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
  const sensors = useSensorGroup();
  const {todolist, setTodolist, statusActive, setStatusActive} = useTodolist();

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const onDragStart = ({active}: DragStartEvent) => {
    if (active) setActiveId(active.id);
  };

  const onDragEnd = ({active, over}: DragEndEvent) => {
    setActiveId(null);
    const oldIndex = todolist.tasks?.findIndex(item => active.id === item.id);
    const currentTask = todolist.tasks[oldIndex];
    const newTodoList = {...todolist};

    if (!over) {
      console.log(statusActive);
      const newData = todolist.tasks.map(e => {
        if (e.name == currentTask.name) {
          const {statusId, ...rest} = e;
          return {statusId: statusActive, ...rest};
        } else {
          return e;
        }
      });
      newTodoList.tasks = newData;
      setStatusActive(0);
      setTodolist(newTodoList as ITodolistResponse);
    }

    if (!over) return;

    if (active.id !== over.id || statusActive !== 0) {
      const newIndex = todolist.tasks?.findIndex(item => over.id === item.id);
      const newStatusId = todolist.tasks[newIndex]?.statusId || statusActive;
      const arrangeTask = arrayMove(todolist.tasks, oldIndex, newIndex);

      newTodoList.tasks = arrangeTask;
      const newData = newTodoList.tasks.map(e => {
        if (e.name == currentTask.name) {
          const {statusId, ...rest} = e;
          return {statusId: newStatusId, ...rest};
        } else {
          return e;
        }
      });
      newTodoList.tasks = newData;
      setStatusActive(0);
      setTodolist(newTodoList as ITodolistResponse);

      arrangeTask.forEach((element, index) => {
        if (element.id === active.id) {
          let newTaskIndex: number | undefined;
          let reindexAll = false;
          const limitDifferenceIndex = 32;
          const listIndex = todolist.tasks.map(e => e.index);
          const maxIndex = Math.max(...listIndex);
          const minIndex = Math.min(...listIndex);
          const taskBefore = arrangeTask[index - 1];
          const task = arrangeTask[index];
          const taskAfter = arrangeTask[index + 1];
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
            .update({id: task.id, index: newTaskIndex, statusId: newStatusId})
            .then(() => {
              console.log('Drag kanban success');
            })
            .then(() => setStatusActive(0))
            .then(socketUpdateList)
            .then(resetIndex);
        }
      });
    }
  };

  return (
    <>
      <div className={style['kanban-container']}>
        <div className="kanban-container-scroll">
          <DndContext {...{sensors, onDragEnd, onDragStart}}>
            {children}
            <DragOverlay>
              {activeId ? (
                <KanbanTaskItem
                  assigneeList={todolist.members}
                  task={todolist.tasks!.filter(e => e.id === activeId)[0]}
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
