import {DndContext, DragOverlay} from '@dnd-kit/core';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {FC, useState} from 'react';

import TaskItem from '@/components/list-detail/task-item';
import ToolbarDetail from '@/components/list-detail/toolbar';
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
  const {activeId, handleDragEnd, setActiveId, todoList, auth, isReadOnly, updateList} = useListDetail({id});
  const [filterValue, SetFilterValue] = useState(0);
  const sensor = useSensorGroup();
  const readonly = isReadOnly();

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

  const isPrivate = () => {
    if (todoList?.visibility === 'PRIVATE' && todoList.userId !== auth?.id) return true;
    return false;
  };

  const onClose = () => {
    if (createUpdateListModal) setCreateUpdateListModal(false);
    if (createUpdateTaskModal) setCreateUpdateTaskModal(false);
    if (deleteListModal) setDeleteListModal(false);
    if (shareListModal) setShareListModal(false);
    if (deleteTaskModal) setDeleteTaskModal(false);
    if (selectedTask) setSelectedTask(undefined);
  };

  const onFilter = (e: number) => {
    SetFilterValue(e);
  };
  const onSuccessFavorite = () => {
    updateList();
  };

  if (!todoList || !id) return null;

  if (isPrivate()) {
    return (
      <div className={styles['list-detail']}>
        <h3 className="error-private-list">Error. This is private list</h3>
      </div>
    );
  }
  const tasksData = todoList.tasks.filter(task => task.isActive && (!filterValue || task.statusId === filterValue));

  return (
    <div className={styles['list-detail']}>
      <div className="container">
        <ToolbarDetail
          todolist={todoList}
          onEdit={() => onUpdateList()}
          onDelete={() => onDeleteList()}
          onShare={() => onShareList()}
          onAddTask={() => onCreateUpdateTask()}
          filterValue={filterValue}
          onFilter={onFilter}
          onSuccessFavorite={onSuccessFavorite}
        />
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
                    statusList={todoList.status}
                    isSelect={false}
                  />
                ))}
              </SortableContext>
            )}
            <DragOverlay>
              {activeId ? (
                <TaskItem readonly={readonly} statusList={todoList.status} task={tasksData.filter(e => e.id === activeId)[0]} isSelect={true} />
              ) : null}
            </DragOverlay>
          </div>
        </DndContext>
        <ModalCreateUpdateList open={createUpdateListModal} onClose={onClose} data={todoList} onSuccess={socketUpdateList} />
        <ModalDelete open={deleteListModal} onClose={onClose} data={selectedTask || todoList} onSuccess={socketUpdateList} />
        <ModalShareList open={shareListModal} onClose={onClose} data={todoList} />
        <ModalCreateUpdateTask open={createUpdateTaskModal} onClose={onClose} listData={todoList} taskData={selectedTask} onSuccess={socketUpdateList} />
        {selectedTask && <ModalDelete open={deleteTaskModal} onClose={onClose} data={selectedTask} onSuccess={socketUpdateList} />}
        <FloatIcon className="float-icon" onClick={() => onCreateUpdateTask()} />
      </div>
    </div>
  );
};

export default ListDetail;
