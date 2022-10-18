import {UniqueIdentifier} from '@dnd-kit/core';
import {useRouter} from 'next/router';
import {useState} from 'react';

import {ROUTES} from '@/configs/routes.config';
import api from '@/data/api';
import {ITaskByListDetail} from '@/data/api/types/task.type';
import {useSensorGroup} from '@/lib/dnd-kit/sensor/sensor-group';
import {useStateAuth} from '@/states/auth';
import {IAction} from '@/types';

export interface IListDetailProp {
  id: string;
}

export default function useListDetail() {
  const router = useRouter();
  const auth = useStateAuth();
  const sensor = useSensorGroup();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [todoList, setTodoList] = useState<ITaskByListDetail>();
  const [action, setAction] = useState<IAction>({type: '', payload: null});
  const [actionTodo, setActionTodo] = useState<IAction>({type: '', payload: null});
  const [shareOpen, setShareOpen] = useState(false);
  const getListTasks = (todoListId: string | undefined) => {
    if (todoListId) {
      return api.task
        .getByList({todoListId})
        .then(res => {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const {tasks, name, id} = res.data;
          if (res.status >= 200) setTodoList({tasks, name, id});
        })
        .catch(() => {
          router.push(ROUTES.LIST);
        });
    } else return Promise.reject('err');
  };

  const handleShare = () => setShareOpen(true);

  // Modal task
  const resetAction = () => setAction({type: '', payload: null});
  const resetActionTodo = () => setActionTodo({type: '', payload: null});

  return {
    auth,
    sensor,
    activeId,
    setActiveId,
    todoList,
    setTodoList,
    actionTodo,
    setActionTodo,
    shareOpen,
    setShareOpen,
    action,
    setAction,
    router,
    getListTasks,
    handleShare,
    resetAction,
    resetActionTodo
  };
}
