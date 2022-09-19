import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import io from 'socket.io-client';

import API from '@/api/network/task';
import {ITodo} from '@/api/types/todo.type';
import {ROUTES} from '@/configs/routes.config';
import {IAction} from '@/types';
import LocalStorage from '@/utils/local-storage';

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`);
export default function useListDetail() {
  const router = useRouter();
  const [todoList, setTodoList] = useState<ITodo>();
  const [action, setAction] = useState<IAction>({type: '', payload: null});
  const [actionTodo, setActionTodo] = useState<IAction>({type: '', payload: null});
  const [shareOpen, setShareOpen] = useState(false);

  const {id} = router.query;
  const page = 'detail';

  const socketMsgToServer = () => socket.emit('msgToServer', {roomId: id});

  const getListTasks = (todoListId: string) =>
    API.getListTasks(todoListId)
      .then(res => {
        if (res.status >= 200) setTodoList(res.data);
      })
      .catch(() => {
        router.push(ROUTES.LIST);
      });

  const handleShare = () => {
    setShareOpen(true);
  };

  const setDone = (taskId: string) => {
    if (!taskId) return;
    API.updateStatusTask(taskId).then(() => {
      getListTasks(String(id) || '');
      socketMsgToServer();
    });
  };

  const resetAction = () => setAction({type: '', payload: null});
  const resetActionTodo = () => setActionTodo({type: '', payload: null});
  const socketMsgToClient = () => {
    socket.on(`msgToClient_${id}`, () => {
      getListTasks(String(id) || '').catch(() => router.push(ROUTES.LIST));
    });
  };

  const reset = () => {
    getListTasks(String(id) || '');
    resetAction();
    resetActionTodo();
    socketMsgToServer();
  };

  useEffect(() => {
    if (id) {
      getListTasks(String(id) || '').catch(() => router.push(ROUTES.LIST));
      socketMsgToClient();
      LocalStorage.previousPage.remove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return {
    router,
    todoList,
    action,
    shareOpen,
    id,
    handleShare,
    reset,
    setActionTodo,
    setDone,
    setAction,
    page,
    setShareOpen,
    resetAction,
    actionTodo,
    resetActionTodo
  };
}
