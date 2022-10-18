import {DndContext, DragOverlay} from '@dnd-kit/core';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {FC, useState} from 'react';

import TaskItem from '@/components/list/list-detail/task-item';
import ToolbarDetail from '@/components/list/list-detail/toolbar';
import ModalCreateUpdateList from '@/components/modal/modal-create-update-list';
import ModalCreateUpdateTask from '@/components/modal/modal-create-update-task';
import ModalDelete from '@/components/modal/modal-delete';
import ModalShareList from '@/components/modal/modal-share-list';
import FloatIcon from '@/core-ui/float-icon';
import {ITaskResponse} from '@/data/api/types/task.type';
import {useSensorGroup} from '@/lib/dnd-kit/sensor/sensor-group';

import useListDetail from './hook';
import styles from './style.module.scss';

export interface Iprops {
  id: string;
}
const ListDetail: FC<Iprops> = ({id}) => {
  const {activeId, handleDragEnd, setActiveId, todoList, updateList} = useListDetail({id});
  const sensor = useSensorGroup();

  const [createUpdateListModal, setCreateUpdateListModal] = useState(false);
  const [deleteListModal, setDeleteListModal] = useState(false);
  const [shareListModal, setShareListModal] = useState(false);

  const [selectedTask, setSelectedTask] = useState<ITaskResponse>();
  const [createUpdateTaskModal, setCreateUpdateTaskModal] = useState(false);
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);

  const onUpdateList = () => {
    setCreateUpdateListModal(true);
  };

  const onDeleteList = () => {
    setDeleteListModal(true);
  };

  const onShareList = () => {
    setShareListModal(true);
  };

  const onCreateUpdateTask = (task?: ITaskResponse) => {
    setSelectedTask(task);
    setCreateUpdateTaskModal(true);
  };

  const onDeleteTask = (task: ITaskResponse) => {
    setSelectedTask(task);
    setDeleteTaskModal(true);
  };

  const onClose = () => {
    if (createUpdateListModal) setCreateUpdateListModal(false);
    if (createUpdateTaskModal) setCreateUpdateTaskModal(false);
    if (deleteListModal) setDeleteListModal(false);
    if (shareListModal) setShareListModal(false);
  };

  if (!todoList || !id) return null;

  return (
    <>
      <div className={styles['list-detail']}>
        <div className="container">
          {todoList.name && (
            <ToolbarDetail
              nameTodo={todoList.name || ''}
              onEdit={() => onUpdateList()}
              onDelete={() => onDeleteList()}
              onShare={() => onShareList()}
              onAddTask={() => onCreateUpdateTask()}
            />
          )}
          <DndContext
            sensors={sensor}
            onDragCancel={() => setActiveId(null)}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
            onDragStart={({active}) => {
              if (!active) {
                return;
              }

              setActiveId(active.id);
            }}
          >
            <div className="tasks">
              {!todoList.tasks.length && <span className="empty">Empty list</span>}
              {todoList.tasks.length && (
                <SortableContext items={todoList.tasks.map(task => task.id!)} strategy={verticalListSortingStrategy}>
                  {todoList.tasks &&
                    todoList.tasks.map(task => (
                      <TaskItem key={task.id} task={task} onEdit={() => onCreateUpdateTask(task)} onDelete={() => onDeleteTask(task)} />
                    ))}
                </SortableContext>
              )}
              <DragOverlay>{activeId ? <TaskItem task={todoList.tasks?.filter(e => e.id === activeId)[0]} /> : null}</DragOverlay>
            </div>
          </DndContext>
        </div>
        <ModalCreateUpdateList open={createUpdateListModal} onClose={onClose} data={todoList} onSuccess={updateList} />
        <ModalDelete open={deleteListModal} onClose={onClose} data={todoList} onSuccess={updateList} />
        <ModalShareList open={shareListModal} onClose={onClose} data={todoList} />
        <ModalCreateUpdateTask open={createUpdateTaskModal} onClose={onClose} listData={todoList} taskData={selectedTask} onSuccess={updateList} />
        {selectedTask && <ModalDelete open={deleteTaskModal} onClose={onClose} data={selectedTask} onSuccess={updateList} />}
        <FloatIcon className="float-icon" onClick={() => onCreateUpdateTask()} />
      </div>
    </>
  );
};

export default ListDetail;
