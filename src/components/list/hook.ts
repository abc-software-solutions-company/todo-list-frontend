import {useEffect, useState} from 'react';

import api from '@/data/api/index';
import {IList} from '@/data/api/types/list.type';

export default function useList() {
  const [todoList, setTodoList] = useState<IList[]>([]);

  const getTodoList = () =>
    api.list.user().then(res => {
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
