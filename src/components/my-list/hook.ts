import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import API from '@/api/network/todo';
import {ITodo} from '@/api/types/todo.type';
import {useStateAuth} from '@/states/auth/context';
import {IAction} from '@/types';

export default function useList() {
  const router = useRouter();
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [action, setAction] = useState<IAction>({type: '', payload: null});
  const [shareOpen, setShareOpen] = useState(false);
  const [id, setId] = useState<string>('');
  const auth = useStateAuth();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getTodoList = (userId: string | any) => API.getTodos(userId).then(res => setTodoList(res.data));

  const resetAction = () => setAction({type: '', payload: null});

  const handleShare = (todoListId: string) => {
    setShareOpen(true);
    setId(todoListId);
  };

  const getUserId = () => {
    if (auth?.name) return auth.id;
  };

  const reset = () => {
    getTodoList(getUserId());
    resetAction();
  };

  useEffect(() => {
    getTodoList(getUserId());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    router,
    todoList,
    action,
    shareOpen,
    id,
    handleShare,
    reset,
    setAction,
    resetAction,
    setShareOpen
  };
}
