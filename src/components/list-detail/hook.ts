import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import {ROUTES} from '@/configs/routes.config';
import api from '@/data/api';
import {ITodolistResponse} from '@/data/api/types/list.type';
import socket from '@/data/socket';
import {SOCKET_EVENTS} from '@/data/socket/type';
import {useStateAuth} from '@/states/auth';

import {Iprops} from '.';

export interface IListDetailProp {
  id: string;
}

export default function useListDetail({id}: Iprops) {
  const router = useRouter();
  const auth = useStateAuth();
  const [todolist, setTodoList] = useState<ITodolistResponse>();

  const updateList = () => {
    api.list
      .getOne({id})
      .then(res => setTodoList(res.data))
      .catch(() => router.push(ROUTES.LIST));
  };

  const isReadOnly = () => {
    if (todolist?.visibility === 'READ_ONLY' && auth?.id !== todolist.userId) return true;
    return false;
  };

  useEffect(() => {
    updateList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (auth) {
      socket.auth = {...auth, listID: id};
      socket.connect();
    }

    socket.on(SOCKET_EVENTS.reconnect, attempt => {
      console.log('SocketIO', SOCKET_EVENTS.reconnect, attempt);
      updateList();
    });

    socket.on(SOCKET_EVENTS.updateList, () => {
      console.log('SocketIO', SOCKET_EVENTS.updateList);
      updateList();
    });

    return () => {
      socket.off(SOCKET_EVENTS.reconnect);
      socket.off(SOCKET_EVENTS.updateList);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return {setTodoList, todolist, updateList, isReadOnly, auth};
}
