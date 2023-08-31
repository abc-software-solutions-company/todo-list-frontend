import {DndContext, DragEndEvent, DragOverlay, DragStartEvent, UniqueIdentifier} from '@dnd-kit/core';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {arrayMove, SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import TaskItem from '@/components/common/task-item';
import {ROUTES} from '@/configs/routes.config';
import api from '@/data/api';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {socketUpdateList} from '@/data/socket';
import {useSensorGroup} from '@/lib/dnd-kit/sensor/sensor-group';
import useFilter from '@/states/filter/use-filter';
import useTodolist from '@/states/todolist/use-todolist';
import {IndexStep} from '@/utils/constant';

const ListTask = () => {
  const router = useRouter();
  const {todolist, write, setTodolist} = useTodolist();
  const {
    getFilterdTasks,
    priorityFilterInList,
    assigneeFilterInList,
    statusFilterInList,
    currentAssignee,
    currentPriority,
    currentStatus,
    setFilterTasks,
    filterTasks,
    setStatusFilterInList,
    setPriorityFilterInList,
    setAssigneeFilterInList,
    getFilterTaskByName,
    nameFilter
  } = useFilter();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  //FIXME: Fix chữa cháy kịp buổi release, sẽ sớm viết lại hàm getTask và các filter cho gọn hơn.

  const handleOnClick = (taskId: string) => {
    router.push(`${ROUTES.TASK}/${taskId}`);
  };

  useEffect(() => {
    setFilterTasks(getFilterdTasks(todolist.tasks, false));
    getFilterTaskByName();
  }, [priorityFilterInList, assigneeFilterInList, statusFilterInList, todolist, router, nameFilter]);
  const sensors = useSensorGroup();
  const modifiers = [restrictToVerticalAxis];
  const onDragCancel = () => setActiveId(null);
  const onDragStart = ({active}: DragStartEvent) => {
    if (active) setActiveId(active.id);
  };

  useEffect(() => {
    if (currentPriority || (currentAssignee != '' && currentAssignee != 'default') || currentStatus) {
      setStatusFilterInList(currentStatus);
      setPriorityFilterInList(currentPriority);
      setAssigneeFilterInList(currentAssignee);
    } else {
      setStatusFilterInList(0);
      setPriorityFilterInList('');
      setAssigneeFilterInList('default');
    }
  }, []);

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
          const indexList = filterTasks.map(e => e.index);
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

  return (
    <DndContext {...{sensors, modifiers, onDragCancel, onDragEnd, onDragStart}}>
      <div className="tasks">
        {filterTasks && filterTasks.length === 0 && <span className="empty">Empty list</span>}
        {filterTasks && filterTasks.length > 0 && (
          <SortableContext
            disabled={!write}
            items={filterTasks.map(task => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {filterTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                todolist={todolist}
                write={write}
                onClick={() => handleOnClick(task.id)}
              />
            ))}
          </SortableContext>
        )}
        <DragOverlay>
          {activeId ? (
            <TaskItem
              key={filterTasks.filter(e => e.id === activeId)[0].id}
              task={filterTasks.filter(e => e.id === activeId)[0]}
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
