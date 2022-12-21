/* eslint-disable @typescript-eslint/no-unused-vars */
import {DndContext, DragEndEvent, DragOverlay, DragStartEvent, UniqueIdentifier} from '@dnd-kit/core';
import {arrayMove, SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {rest} from 'lodash-es';
import React, {useState} from 'react';

import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {socketUpdateList} from '@/data/socket';
import {useSensorGroup} from '@/lib/dnd-kit/sensor/sensor-group';
import useTodolist from '@/states/todolist/use-todolist';
import useTodolistKanban from '@/states/todolist-kanban/use-kanban';
import {IndexStep} from '@/utils/constant';

import KanbanTaskItem from './item';

interface IKanbanColumnBody {
  tasks: ITaskResponse[];
}

export default function KanbanColumnBody({tasks}: IKanbanColumnBody) {
  const {initial, todolistKanban, setTodolistKanban} = useTodolistKanban();
  const {todolist, write, setTodolist} = useTodolist();
  const [taskList, setTaskList] = useState<ITaskResponse[]>(tasks);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensorGroup();

  const onDragStart = ({active}: DragStartEvent) => {
    if (active) setActiveId(active.id);
  };

  const onDragEnd = ({active, over}: DragEndEvent) => {
    setActiveId(null);
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = todolist.tasks?.findIndex(item => active.id === item.id);
      const newIndex = todolist.tasks?.findIndex(item => over.id === item.id);
      const arrangeTask = arrayMove(todolist.tasks, oldIndex, newIndex);
      const newTodoList = {...todolist};
      newTodoList.tasks = arrangeTask;
      setTodolist(newTodoList as ITodolistResponse);
      setTaskList(
        arrayMove(
          taskList,
          taskList.findIndex(item => active.id == item.id),
          taskList.findIndex(item => over.id == item.id)
        )
      );

      arrangeTask.forEach((element, index) => {
        if (element.id === active.id) {
          let newTaskIndex: number | undefined;
          let reindexAll = false;
          const limitDifferenceIndex = 32;
          const listIndex = tasks.map(e => e.index);
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

          api.task.update({id: task.id, index: newTaskIndex}).then(resetIndex).then(socketUpdateList);
        }
      });
    }
  };

  return (
    <div className="kanban-column">
      <DndContext {...{sensors, onDragEnd, onDragStart}}>
        <div className="tasks">
          {taskList && taskList.length > 0 && (
            <SortableContext
              disabled={!write}
              items={taskList.map(task => task.id)}
              strategy={verticalListSortingStrategy}
            >
              {taskList.map(task => (
                <KanbanTaskItem task={task} assigneeList={todolistKanban.members} key={task.id} />
              ))}
            </SortableContext>
          )}
          <DragOverlay>
            {activeId ? (
              <KanbanTaskItem
                assigneeList={todolistKanban.members}
                task={taskList!.filter(e => e.id === activeId)[0]}
              />
            ) : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  );
}
