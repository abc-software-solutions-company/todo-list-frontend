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
  const {todolist, setTodolist} = useTodolist();

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const onDragStart = ({active}: DragStartEvent) => {
    if (active) setActiveId(active.id);
  };

  const onDragEnd = ({active, over}: DragEndEvent) => {
    setActiveId(null);
    if (!over) return;
    // if (active.id !== over.id) {
    //   console.log('😂 setTodolist don"t set ');
    // }

    if (active.id !== over.id) {
      // console.log('🚀 ~ file: index.tsx:36 ~ onDragEnd ~ over', over);
      // console.log('🚀 ~ file: index.tsx:36 ~ onDragEnd ~ active', active);
      const oldIndex = todolist.tasks?.findIndex(item => active.id === item.id);
      const currentTask = todolist.tasks[oldIndex];
      // console.log('🚀 ~ file: index.tsx:40 ~ onDragEnd ~ currentTask', currentTask);

      // console.log('🚀 ~ file: index.tsx:39 ~ onDragEnd ~ oldIndex', oldIndex);
      const newIndex = todolist.tasks?.findIndex(item => over.id === item.id);
      // console.log('🚀 ~ file: index.tsx:41 ~ onDragEnd ~ newIndex', newIndex);

      const newStatusId = todolist.tasks[newIndex]?.statusId || over.id;
      const arrangeTask = arrayMove(todolist.tasks, oldIndex, newIndex);
      // console.log('🚀 ~ file: index.tsx:45 ~ onDragEnd ~ newIndex', newIndex);
      const newTodoList = {...todolist};

      newTodoList.tasks = arrangeTask;
      // newTodoList.tasks.map(e => {
      //   if (e.name == currentTask.name) {
      //     e.statusId = newStatusId;
      //     return e;
      //   }
      //   return e;
      // });
      console.log(newTodoList);
      const newData = newTodoList.tasks.map(e => {
        if (e.name == currentTask.name) {
          const {statusId, ...rest} = e;
          return {statusId: parseInt(newStatusId.toString()), ...rest};
        } else {
          return e;
        }
      });
      console.log(newData);
      newTodoList.tasks = newData;
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
            .update({id: task.id, index: newTaskIndex, statusId: parseInt(newStatusId.toString())})
            .then(socketUpdateList)
            .then(resetIndex);
        }
      });
    }
  };

  return (
    <>
      <div className={style['kanban-container']}>
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
    </>
  );
};

export default KanbanContainer;
