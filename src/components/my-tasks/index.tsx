import React, {useEffect} from 'react';

import {ROUTES} from '@/configs/routes.config';
import socket from '@/data/socket';
import {SOCKET_EVENTS} from '@/data/socket/type';
import {useStateAuth} from '@/states/auth';
import useTasks from '@/states/tasks/use-tasks';
import LocalStorage from '@/utils/local-storage';

import Title from '../lists/title';
import ListTask from './list-task';
import styles from './style.module.scss';

const MyTasks = () => {
  const {myTasks, getMyTasks} = useTasks();
  const auth = useStateAuth();

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
        <div className="h-[12px]"></div>
        <div className="container">
          <Title tilte={'My Tasks'} />
          {myTasks?.filter(x => x !== null).length == 0 && (
            <span className="empty">Currently No Task Assign To You</span>
          )}
          {myTasks && <ListTask myTask={myTasks} />}
        </div>
      </div>
    </>
  );
};

export default MyTasks;
