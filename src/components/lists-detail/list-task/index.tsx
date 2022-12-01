import {DndContext, DragEndEvent, DragOverlay, DragStartEvent, UniqueIdentifier} from '@dnd-kit/core';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {arrayMove, SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {useState} from 'react';

import TaskItem from '@/components/lists-detail/task-item';
import api from '@/data/api';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {socketUpdateList} from '@/data/socket';
import {useSensorGroup} from '@/lib/dnd-kit/sensor/sensor-group';
import useTodolist from '@/states/todolist/use-todolist';
import {IndexStep} from '@/utils/constant';

const ListTask = () => {
  const {todolist, statusFilter, write, setTodolist} = useTodolist();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const getTasks = () => {
    if (statusFilter) return todolist.tasks.filter(e => !statusFilter || e.statusId == statusFilter);
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
  }

  return (
    <DndContext {...{sensors, modifiers, onDragCancel, onDragEnd, onDragStart}}>
      <div className="tasks">
        {tasks && tasks.length === 0 && <span className="empty">Empty list</span>}
        {tasks && tasks.length > 0 && (
          <SortableContext disabled={!write} items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
            {tasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </SortableContext>
        )}
        <DragOverlay>
          {activeId ? <TaskItem key={tasks.filter(e => e.id === activeId)[0].id} task={tasks.filter(e => e.id === activeId)[0]} isSelect={true} /> : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default ListTask;
