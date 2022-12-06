import Link from 'next/link';
import React, {FC} from 'react';

import TaskItem from '@/components/common/task-item';
import {ROUTES} from '@/configs/routes.config';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {useStateAuth} from '@/states/auth';

interface IListTaskProps {
  myTask: ITodolistResponse[];
}

const ListTask: FC<IListTaskProps> = ({myTask}) => {
  const auth = useStateAuth();

  return (
    <>
      {myTask.map(todolist => {
        const write = Boolean(todolist)
          ? todolist.visibility === 'PUBLIC' || Boolean(auth && auth.id === todolist.userId)
          : false;
        return (
          <div key={todolist.id}>
            <div className="h-7"></div>
            <Link href={ROUTES.LIST + `/${todolist.id}`}>
              <h4 className="w-fit cursor-pointer text-h4 font-semibold">{todolist.name}</h4>
            </Link>
            <div className="h-4"></div>{' '}
            <div className="tasks">
              {todolist?.tasks.map(task => (
                <TaskItem key={task.id} task={task} todolist={todolist} write={write} />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ListTask;
