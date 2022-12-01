import {AxiosResponse} from 'axios';
import {useEffect, useState} from 'react';

import InputAutosize from '@/components/common/input-autosize';
import TaskItem from '@/components/lists-detail/task-item';
import api from '@/data/api';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import LayoutDefault from '@/layouts/default';

export default function PageMyTask() {
  const [myTask, setMyTask] = useState<AxiosResponse<ITodolistResponse[], any>>();

  useEffect(() => {
    const promise = api.todolist.getMyTask();
    promise.then(data => setMyTask(data));
  }, []);

  if (!myTask) return;

  return (
    <>
      {myTask.data.map(item => (
        <>
          <InputAutosize value={item.name} role="title" handleSave={() => {}} />
          {item.tasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </>
      ))}
    </>
  );
}

PageMyTask.Layout = LayoutDefault;
