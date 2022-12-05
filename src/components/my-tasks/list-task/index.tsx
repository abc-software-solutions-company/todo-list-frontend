import React, {FC, useEffect} from 'react';

import TaskItem from '@/components/common/task-item';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import socket from '@/data/socket';
import {SOCKET_EVENTS} from '@/data/socket/type';
import {useStateAuth} from '@/states/auth';
import useTasks from '@/states/tasks/use-tasks';

interface IListTaskProps {
  myTask: ITodolistResponse[];
}

const ListTask: FC<IListTaskProps> = ({myTask}) => {
  const auth = useStateAuth();
  const {getMyTasks} = useTasks();

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
      {myTask.map(todolist => {
        const write = Boolean(todolist)
          ? todolist.visibility === 'PUBLIC' || Boolean(auth && auth.id === todolist.userId)
          : false;
        return (
          <div key={todolist.id}>
            <div className="h-7"></div>
            <h4 className="text-h4 font-semibold">{todolist.name}</h4>
            <div className="h-4"></div>{' '}
            <div className="tasks">
              {todolist?.tasks.map(task => (
                <TaskItem key={task.id} task={task} todolist={todolist} write={write} />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ListTask;
