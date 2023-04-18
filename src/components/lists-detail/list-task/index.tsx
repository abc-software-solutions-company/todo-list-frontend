import {DndContext, DragEndEvent, DragOverlay, DragStartEvent, UniqueIdentifier} from '@dnd-kit/core';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {arrayMove, SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {useEffect, useState} from 'react';

import TaskItem from '@/components/common/task-item';
import api from '@/data/api';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {socketUpdateList} from '@/data/socket';
import {useSensorGroup} from '@/lib/dnd-kit/sensor/sensor-group';
import useFilter from '@/states/filter/use-filter';
import useTodolist from '@/states/todolist/use-todolist';
import {IndexStep, Priorities} from '@/utils/constant';

const ListTask = () => {
  const {todolist, write, setTodolist} = useTodolist();
  const {statusFilterInList, setStatusFilterInList, priorityFilterInList, setPriorityFilterInList} = useFilter();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const getTasks = () => {
    const PrioritiesList = Object.values(Priorities).reverse();
    const PrioritieValue = PrioritiesList.includes(priorityFilterInList) ? priorityFilterInList : '';
    if (PrioritieValue && statusFilterInList)
      return todolist.tasks.filter(
        e =>
          !PrioritieValue || !statusFilterInList || (e.priority == PrioritieValue && e.statusId == statusFilterInList)
      );
    if (statusFilterInList) return todolist.tasks.filter(e => !statusFilterInList || e.statusId == statusFilterInList);
    if (PrioritieValue) return todolist.tasks.filter(e => !PrioritieValue || e.priority == PrioritieValue);
    return todolist.tasks?.filter(e => !e.isDone);
  };

  const tasks = getTasks();

  const sensors = useSensorGroup();
  const modifiers = [restrictToVerticalAxis];

  const onDragCancel = () => setActiveId(null);
  const onDragStart = ({active}: DragStartEvent) => {
    if (active) setActiveId(active.id);
  };

  function onDragEnd({active, over}: DragEndEvent) {
    setActiveId(null);
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = todolist.tasks?.findIndex(item => active.id === item.id);
      const newIndex = todolist.tasks?.findIndex(item => over.id === item.id);
      const arrangeTask = arrayMove(todolist.tasks, oldIndex, newIndex);
      const newTodoList = {...todolist};
      newTodoList.tasks = arrangeTask;
      setTodolist(newTodoList as ITodolistResponse);

      arrangeTask.forEach((element, index) => {
        if (element.id === active.id) {
          let newTaskIndex: number | undefined;
          let reindexAll = false;
          const limitDifferenceIndex = 32;
          const indexList = tasks.map(e => e.index);
          const maxIndex = Math.max(...indexList);
          const minIndex = Math.min(...indexList);
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
  }

  useEffect(() => {
    setStatusFilterInList(0);
    setPriorityFilterInList('');
  }, []);

  return (
    <DndContext {...{sensors, modifiers, onDragCancel, onDragEnd, onDragStart}}>
      <div className="tasks">
        {tasks && tasks.length === 0 && <span className="empty">Empty list</span>}
        {tasks && tasks.length > 0 && (
          <SortableContext disabled={!write} items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
            {tasks.map(task => (
              <TaskItem key={task.id} task={task} todolist={todolist} write={write} />
            ))}
          </SortableContext>
        )}
        <DragOverlay>
          {activeId ? (
            <TaskItem
              key={tasks.filter(e => e.id === activeId)[0].id}
              task={tasks.filter(e => e.id === activeId)[0]}
              isSelect={true}
              todolist={todolist}
            />
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default ListTask;
