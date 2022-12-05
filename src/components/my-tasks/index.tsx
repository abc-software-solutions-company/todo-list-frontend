import React, {useEffect} from 'react';

import {ROUTES} from '@/configs/routes.config';
import socket, {socketUpdateList} from '@/data/socket';
import {SOCKET_EVENTS} from '@/data/socket/type';
import {useStateAuth} from '@/states/auth';
import useTasks from '@/states/tasks/use-tasks';
import useTodolist from '@/states/todolist/use-todolist';
import LocalStorage from '@/utils/local-storage';

import Title from '../lists/title';
import ModalCreateUpdateTask from '../modal/modal-create-update-task';
import ModalDelete from '../modal/modal-delete';
import ListTask from './list-task';
import styles from './style.module.scss';

const MyTasks = () => {
  const {selectedTask, isOpenModal, setIsOpenModal} = useTodolist();
  const {myTasks, getMyTasks} = useTasks();
  const auth = useStateAuth();

  const onClose = () => {
    setIsOpenModal(null);
  };

  useEffect(() => {
    LocalStorage.checkPage.set(ROUTES.TASK);
    getMyTasks();
  }, []);

  useEffect(() => {
    if (auth) {
      socket.auth = {...auth};
      socket.connect();
    }

    socket.on(SOCKET_EVENTS.reconnect, attempt => {
      console.log('SocketIO', SOCKET_EVENTS.reconnect, attempt);
    });

    socket.on(SOCKET_EVENTS.updateList, () => {
      console.log('SocketIO', SOCKET_EVENTS.updateList);
      getMyTasks();
    });

    return () => {
      socket.off(SOCKET_EVENTS.reconnect);
      socket.off(SOCKET_EVENTS.updateList);
    };
  }, [auth]);

  return (
    <>
      <div className={styles['list-task']}>
        <div className="h-[22px]"></div>
        <div className="container">
          <Title tilte={'My Tasks'} />
          {myTasks && <ListTask myTask={myTasks} />}
          {selectedTask && (
            <ModalDelete open={isOpenModal.delete} onClose={onClose} data={selectedTask} onSuccess={socketUpdateList} />
          )}
          {selectedTask && (
            <ModalCreateUpdateTask
              open={isOpenModal.task}
              onClose={onClose}
              taskData={selectedTask}
              onSuccess={socketUpdateList}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MyTasks;
