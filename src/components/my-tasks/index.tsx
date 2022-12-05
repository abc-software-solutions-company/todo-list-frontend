import React, {useEffect} from 'react';

import useTasks from '@/states/tasks/use-tasks';
import useTodolist from '@/states/todolist/use-todolist';

import Title from '../lists/title';
import ModalCreateUpdateTask from '../modal/modal-create-update-task';
import ModalDelete from '../modal/modal-delete';
import ListTask from './list-task';
import styles from './style.module.scss';

const MyTasks = () => {
  const {selectedTask, isOpenModal, setIsOpenModal} = useTodolist();
  const {myTasks, getMyTasks} = useTasks();

  const onClose = () => {
    setIsOpenModal(null);
  };

  useEffect(() => {
    getMyTasks();
  }, []);

  console.log(myTasks);

  return (
    <>
      <div className={styles['list-task']}>
        <div className="h-[22px]"></div>
        <div className="container">
          <Title tilte={'My Tasks'} />
          {myTasks && <ListTask myTask={myTasks} />}
          {selectedTask && (
            <ModalDelete open={isOpenModal.delete} onClose={onClose} data={selectedTask} onSuccess={getMyTasks} />
          )}
          {selectedTask && (
            <ModalCreateUpdateTask
              open={isOpenModal.task}
              onClose={onClose}
              taskData={selectedTask}
              onSuccess={getMyTasks}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MyTasks;
