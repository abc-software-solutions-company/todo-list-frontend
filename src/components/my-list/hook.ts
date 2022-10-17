import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import API from '@/data/api/index';
import {IList} from '@/data/api/types/list.type';
import {IAction} from '@/types';

export default function useList() {
  const router = useRouter();
  const [todoList, setTodoList] = useState<IList[]>([]);
  const [action, setAction] = useState<IAction>({type: '', payload: null});
  const [shareOpen, setShareOpen] = useState(false);
  const [id, setId] = useState<string>('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const getTodoList = (userId: string | any) => API.getTodos(userId).then(res => setTodoList(res.data));
  const getTodoList = () =>
    API.list.user().then(res => {
      setTodoList(res.data);
    });

  const resetAction = () => setAction({type: '', payload: null});

  const handleShare = (todoListId: string) => {
    setShareOpen(true);
    setId(todoListId);
  };

  const reset = () => {
    getTodoList();
    resetAction();
  };

  useEffect(() => {
    getTodoList();
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
