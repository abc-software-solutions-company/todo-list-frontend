import Link from 'next/link';
import React, {FC, useEffect} from 'react';

import TaskItem from '@/components/common/task-item';
import {ROUTES} from '@/configs/routes.config';
import {useStateAuth} from '@/states/auth';
import useFilter from '@/states/filter/use-filter';
import useTasks from '@/states/tasks/use-tasks';

const ListTask: FC = () => {
  const auth = useStateAuth();
  const {myTasks} = useTasks();
  const {statusFilterInMytask, setStatusFilterInMyTask} = useFilter();

  const filterMyTasks = () => {
    if (myTasks && myTasks.length > 0) {
      return myTasks.map((todolist, index) => {
        return {
          ...todolist,
          tasks:
            statusFilterInMytask.length != 0
              ? todolist.tasks.filter(e => !statusFilterInMytask[index] || e.statusId == statusFilterInMytask[index])
              : todolist.tasks.filter(e => !e.isDone)
        };
      });
    }
  };

  const temp = filterMyTasks();

  useEffect(() => {
    setStatusFilterInMyTask([]);
  }, []);

  return (
    <>
      {myTasks?.filter(x => x !== null).length == 0 && <span className="empty">Empty Tasks</span>}
      {temp &&
        temp.length > 0 &&
        temp.map(todolist => {
          const write = Boolean(todolist)
            ? todolist.visibility === 'PUBLIC' || Boolean(auth && auth.id === todolist.userId)
            : false;
          return (
            <div key={todolist.id}>
              <div className="h-6 lg:h-7"></div>
              {todolist.tasks.length > 0 && (
                <Link href={ROUTES.LIST + `/${todolist.id}`}>
                  <h4 className="w-fit cursor-pointer text-base font-semibold md:text-h4">{todolist.name}</h4>
                </Link>
              )}
              <div className="h-3 lg:h-4"></div>{' '}
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
