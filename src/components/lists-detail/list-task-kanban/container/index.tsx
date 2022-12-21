import {DndContext, DragEndEvent, DragOverlay, DragStartEvent, UniqueIdentifier} from '@dnd-kit/core';
import {arrayMove} from '@dnd-kit/sortable';
import React, {ReactNode, useState} from 'react';

import api from '@/data/api';
import {socketUpdateList} from '@/data/socket';
import {useSensorGroup} from '@/lib/dnd-kit/sensor/sensor-group';
import useTodolistKanban from '@/states/todolist-kanban/use-kanban';
import {IndexStep} from '@/utils/constant';

import KanbanTaskItem from '../column/body/item';
import style from './style.module.scss';

interface IKanbanContainer {
  children: ReactNode;
}

const KanbanContainer = ({children}: IKanbanContainer) => {
  const sensors = useSensorGroup();
  const {todolistKanban, setTodolistKanban, statusActive, initial} = useTodolistKanban();

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const onDragStart = ({active}: DragStartEvent) => {
    if (active) setActiveId(active.id);
  };

  const onDragEnd = ({active, over}: DragEndEvent) => {
    setActiveId(null);
    if (!over) return;
    if (active.id !== over.id) {
      const tasks = todolistKanban.status.filter(e => e.id == statusActive)[0].tasks;
      const oldIndex = tasks?.findIndex(item => active.id === item.id);
      const newIndex = tasks?.findIndex(item => over.id === item.id) || 0;
      const newStatusId = tasks![newIndex]?.statusId || over.id;

      const arrangeTask = arrayMove(tasks!, oldIndex!, newIndex);
      console.log(arrangeTask);

      const newKanbanState = todolistKanban;
      newKanbanState.status.filter(e => e.id == statusActive)[0].tasks = arrangeTask;

      setTodolistKanban(newKanbanState);

      arrangeTask.forEach((element, index) => {
        if (element.id === active.id) {
          let newTaskIndex: number | undefined;
          let reindexAll = false;
          const limitDifferenceIndex = 32;
          const listIndex = tasks!.map(e => e.index);
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
            if (reindexAll) api.task.reindexAll({todolistId: todolistKanban.id});
          };

          api.task
            .update({id: task.id, index: newTaskIndex, statusId: parseInt(newStatusId.toString())})
            .then(resetIndex)
            .then(socketUpdateList)
            .then(() => initial(todolistKanban.id));
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
                assigneeList={todolistKanban.members}
                task={
                  todolistKanban.status.filter(e => e.id == statusActive)[0].tasks!.filter(e => e.id === activeId)[0]
                }
              />
            ) : // <p>AA</p>
            null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
};

export default KanbanContainer;
