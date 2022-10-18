import {DragEndEvent, UniqueIdentifier} from '@dnd-kit/core';
import {arrayMove} from '@dnd-kit/sortable';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import {ROUTES} from '@/configs/routes.config';
import api from '@/data/api';
import {IListResponse} from '@/data/api/types/list.type';
import {ITaskResponse} from '@/data/api/types/task.type';
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
  const [todoList, setTodoList] = useState<IListResponse>();

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const updateList = () => {
    console.log('🚀 ~ file: hook.ts ~ line 33 ~ updateList ~ updateList');
    api.list
      .getOne({id})
      .then(res => setTodoList(res.data))
      .catch(() => router.push(ROUTES.LIST));
  };

  function handleDragEnd({active, over}: DragEndEvent) {
    setActiveId(null);
    if (!over) return;
    if (active.id !== over.id) {
      const taskList: ITaskResponse[] = todoList!.tasks;
      const oldIndex = taskList?.findIndex(item => active.id === item.id);
      const newIndex = taskList?.findIndex(item => over.id === item.id);
      const arrangeTask = arrayMove(todoList!.tasks, oldIndex!, newIndex!);
      const newTodoList = {...todoList};
      newTodoList.tasks = arrangeTask;
      setTodoList(newTodoList as IListResponse);

      arrangeTask.forEach((element, index) => {
        if (element.id === active.id) {
          const taskFirstId = arrangeTask[index - 1]?.id;
          const taskReorderId = arrangeTask[index].id!;
          const taskSecondId = arrangeTask[index + 1]?.id;
          console.log(
            `taskFirstID is ${taskFirstId},
            taskSecondID is ${taskSecondId},
            taskReorderId is ${taskReorderId}`
          );
          api.task.reIndex({taskFirstId, taskReorderId, taskSecondId}).then(() => updateList());
        }
      });
    }
  }

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

  return {activeId, todoList, handleDragEnd, setActiveId, updateList};
}
