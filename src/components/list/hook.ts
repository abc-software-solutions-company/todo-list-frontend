import {useEffect, useState} from 'react';

import api from '@/data/api/index';
import {IListResponse} from '@/data/api/types/list.type';

export default function useList() {
  const [todoList, setTodoList] = useState<IListResponse[]>([]);

  const getTodoList = () =>
    api.list.getByUser().then(res => {
      setTodoList(res.data);
    });

  useEffect(() => {
    getTodoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    todoList
  };
}
