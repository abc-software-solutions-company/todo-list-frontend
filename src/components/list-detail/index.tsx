import {FC, useState} from 'react';

import ErrorInformation from '@/components/common/404';
import ToolbarDetail from '@/components/list-detail/toolbar';
import ModalCreateUpdateList from '@/components/modal/modal-create-update-list';
import ModalCreateUpdateTask from '@/components/modal/modal-create-update-task';
import ModalDelete from '@/components/modal/modal-delete';
import ModalShare from '@/components/modal/modal-share';
import FloatIcon from '@/core-ui/float-icon';
import {ITaskResponse} from '@/data/api/types/task.type';
import {socketUpdateList} from '@/data/socket';

import useListDetail from './hook';
import ListTask from './list-task';
import styles from './style.module.scss';

export interface Iprops {
  id: string;
}
const ListDetail: FC<Iprops> = ({id}) => {
  const {setTodoList, todoList, auth, isReadOnly, updateList} = useListDetail({id});
  const [filterValue, SetFilterValue] = useState(0);
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
    return <ErrorInformation />;
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
        <ListTask
          list={todoList}
          onCreateUpdateTask={onCreateUpdateTask}
          onDeleteTask={onDeleteTask}
          readonly={readonly}
          setList={setTodoList}
          tasksData={tasksData}
        />
        <ModalCreateUpdateList open={createUpdateListModal} onClose={onClose} data={todoList} onSuccess={socketUpdateList} />
        <ModalDelete open={deleteListModal} onClose={onClose} data={selectedTask || todoList} onSuccess={socketUpdateList} />
        <ModalShare open={shareListModal} onClose={onClose} data={todoList} />
        <ModalCreateUpdateTask open={createUpdateTaskModal} onClose={onClose} listData={todoList} taskData={selectedTask} onSuccess={socketUpdateList} />
        {selectedTask && <ModalDelete open={deleteTaskModal} onClose={onClose} data={selectedTask} onSuccess={socketUpdateList} />}
        {!readonly && <FloatIcon className="float-icon" onClick={() => onCreateUpdateTask()} />}
      </div>
    </div>
  );
};

export default ListDetail;
