import {DndContext, DragEndEvent, DragOverlay, UniqueIdentifier} from '@dnd-kit/core';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {arrayMove, SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {useState} from 'react';

import TaskItem from '@/components/list-detail/task-item';
import api from '@/data/api';
import {ITodolistResponse} from '@/data/api/types/list.type';
import {ITaskResponse} from '@/data/api/types/task.type';
import {socketUpdateList} from '@/data/socket';
import {useSensorGroup} from '@/lib/dnd-kit/sensor/sensor-group';

interface IProp {
  list: ITodolistResponse;
  setList: (list: ITodolistResponse) => void;
  tasksData: ITaskResponse[];
  readonly: boolean;
  onCreateUpdateTask: (task: ITaskResponse) => void;
  onDeleteTask: (task: ITaskResponse) => void;
}

const ListTask = ({list, setList, tasksData, readonly, onCreateUpdateTask, onDeleteTask}: IProp) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensor = useSensorGroup();

  function handleDragEnd({active, over}: DragEndEvent) {
    setActiveId(null);
    if (!over) return;
    if (active.id !== over.id) {
      const taskList: ITaskResponse[] = list!.tasks;
      const oldIndex = taskList?.findIndex(item => active.id === item.id);
      const newIndex = taskList?.findIndex(item => over.id === item.id);
      const arrangeTask = arrayMove(list!.tasks, oldIndex!, newIndex!);
      const newTodoList = {...list};
      newTodoList.tasks = arrangeTask;
      setList(newTodoList as ITodolistResponse);

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
    <>
      <DndContext
        sensors={sensor}
        modifiers={[restrictToVerticalAxis]}
        onDragCancel={() => setActiveId(null)}
        onDragStart={({active}) => {
          if (!active) {
            return;
          }
          setActiveId(active.id);
        }}
        onDragEnd={handleDragEnd}
      >
        <div className="tasks">
          {tasksData.length === 0 && <span className="empty">Empty list</span>}
          {tasksData.length > 0 && (
            <SortableContext disabled={readonly} items={tasksData.map(task => task.id!)} strategy={verticalListSortingStrategy}>
              {tasksData.map(task => (
                <TaskItem
                  readonly={readonly}
                  key={task.id}
                  task={task}
                  onEdit={() => onCreateUpdateTask(task)}
                  onDelete={() => onDeleteTask(task)}
                  statusList={list.status}
                  isSelect={false}
                />
              ))}
            </SortableContext>
          )}
          <DragOverlay>
            {activeId ? <TaskItem readonly={readonly} statusList={list.status} task={tasksData.filter(e => e.id === activeId)[0]} isSelect={true} /> : null}
          </DragOverlay>
        </div>
      </DndContext>
    </>
  );
};

export default ListTask;
