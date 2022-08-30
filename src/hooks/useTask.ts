import API from '@/api/network/task';
import {ITask} from '@/api/network/task';
import {useEffect, useState} from 'react';

const useTask = (listId: string) => {
  const [task, setTask] = useState<ITask[] | null>(null);
  const fetchData = async () => {
    await API.getTasks(listId).then(res => {
      if (res.status == 200) {
        setTask(res.data.reverse());
      }
    });
  };
  useEffect(() => {
    fetchData();
  }, [listId]);

  return {task, fetchData};
};

export default useTask;
