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
import {socketUpdateList} from '@/data/socket';
import {useSensorGroup} from '@/lib/dnd-kit/sensor/sensor-group';

import useListDetail from './hook';
import styles from './style.module.scss';

export interface Iprops {
  id: string;
}
const ListDetail: FC<Iprops> = ({id}) => {
  const {activeId, handleDragEnd, setActiveId, todoList} = useListDetail({id});
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
    if (deleteTaskModal) setDeleteTaskModal(false);
    if (selectedTask) setSelectedTask(undefined);
  };

  if (!todoList || !id) return null;
  const activeTasks = todoList.tasks.filter(list => list.isActive);

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
              {activeTasks.length === 0 && <span className="empty">Empty list</span>}
              {activeTasks.length > 0 && (
                <SortableContext items={activeTasks.map(task => task.id!)} strategy={verticalListSortingStrategy}>
                  {activeTasks &&
                    activeTasks.map(task => <TaskItem key={task.id} task={task} onEdit={() => onCreateUpdateTask(task)} onDelete={() => onDeleteTask(task)} />)}
                </SortableContext>
              )}
              <DragOverlay>{activeId ? <TaskItem task={activeTasks.filter(e => e.id === activeId)[0]} /> : null}</DragOverlay>
            </div>
          </DndContext>
        </div>
        <ModalCreateUpdateList open={createUpdateListModal} onClose={onClose} data={todoList} onSuccess={socketUpdateList} />
        <ModalDelete open={deleteListModal} onClose={onClose} data={selectedTask || todoList} onSuccess={socketUpdateList} />
        <ModalShareList open={shareListModal} onClose={onClose} data={todoList} />
        <ModalCreateUpdateTask open={createUpdateTaskModal} onClose={onClose} listData={todoList} taskData={selectedTask} onSuccess={socketUpdateList} />
        {selectedTask && <ModalDelete open={deleteTaskModal} onClose={onClose} data={selectedTask} onSuccess={socketUpdateList} />}
        <FloatIcon className="float-icon" onClick={() => onCreateUpdateTask()} />
      </div>
    </>
  );
};

export default ListDetail;
