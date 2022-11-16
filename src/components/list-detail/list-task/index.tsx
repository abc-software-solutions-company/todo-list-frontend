import {DndContext, DragEndEvent, DragOverlay, DragStartEvent, UniqueIdentifier} from '@dnd-kit/core';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {arrayMove, SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {useState} from 'react';

import TaskItem from '@/components/list-detail/task-item';
import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {socketUpdateList} from '@/data/socket';
import {useSensorGroup} from '@/lib/dnd-kit/sensor/sensor-group';
import useTodolist from '@/states/todolist/use-todolist';

const ListTask = () => {
  const {todolist, statusFilter, write, setTodolist} = useTodolist();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensorGroup();
  const modifiers = [restrictToVerticalAxis];

  const tasks = todolist.tasks.filter(e => e.isActive && (!statusFilter || e.statusId == statusFilter));

  const onDragCancel = () => setActiveId(null);
  const onDragStart = ({active}: DragStartEvent) => {
    if (active) setActiveId(active.id);
  };
  function onDragEnd({active, over}: DragEndEvent) {
    setActiveId(null);
    if (!over) return;
    if (active.id !== over.id) {
      const taskList: ITaskResponse[] = todolist.tasks;
      const oldIndex = taskList?.findIndex(item => active.id === item.id);
      const newIndex = taskList?.findIndex(item => over.id === item.id);
      const arrangeTask = arrayMove(todolist.tasks, oldIndex!, newIndex!);
      const newTodoList = {...todolist};
      newTodoList.tasks = arrangeTask;
      setTodolist(newTodoList as ITodolistResponse);

      arrangeTask.forEach((element, index) => {
        if (element.id === active.id) {
          const taskFirstId = arrangeTask[index - 1]?.id;
          const taskReorderId = arrangeTask[index].id!;
          const taskSecondId = arrangeTask[index + 1]?.id;
          api.task
            .reindex({taskFirstId, taskReorderId, taskSecondId})
            .then(socketUpdateList)
            .catch(() => {});
        }
      });
    }
  }

  return (
    <DndContext {...{sensors, modifiers, onDragCancel, onDragEnd, onDragStart}}>
      <div className="tasks">
        {tasks.length === 0 && <span className="empty">Empty list</span>}
        {tasks.length > 0 && (
          <SortableContext disabled={!write} items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
            {tasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </SortableContext>
        )}
        <DragOverlay>{activeId ? <TaskItem task={tasks.filter(e => e.id === activeId)[0]} isSelect={true} /> : null}</DragOverlay>
      </div>
    </DndContext>
  );
};

export default ListTask;
