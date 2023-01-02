import React, {useEffect} from 'react';

import {ROUTES} from '@/configs/routes.config';
import socket from '@/data/socket';
import {SOCKET_EVENTS} from '@/data/socket/type';
import {useStateAuth} from '@/states/auth';
import useTasks from '@/states/tasks/use-tasks';
import LocalStorage from '@/utils/local-storage';

import Loading from '../common/loading';
import ToolFilter from '../common/tool-filter';
import ListTask from './list-task';
import styles from './style.module.scss';

const MyTasks = () => {
  const auth = useStateAuth();
  const {myTasks, getMyTasks} = useTasks();

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
  if (myTasks == undefined) return <Loading />;
  if (myTasks) console.log('🚀 ~ file: index.tsx:62 ~ MyTasks ~ myTasks', myTasks);

  if (myTasks)
    return (
      <>
        <div className={styles['list-task']}>
          <div className="h-[12px]"></div>
          <div className="flex items-center justify-end">
            {myTasks
              ?.filter(x => x != null)
              .map(e => e.tasks.length)
              .reduce((a, b) => a + b, 0) != 0 && <ToolFilter myTasks={myTasks} />}
          </div>
          <ListTask />
        </div>
      </>
    );
  return <></>;
};

export default MyTasks;
