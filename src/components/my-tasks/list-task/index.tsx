import Link from 'next/link';
import React, {FC, useEffect} from 'react';

import TaskItem from '@/components/common/task-item';
import {ROUTES} from '@/configs/routes.config';
import {useStateAuth} from '@/states/auth';
import useFilter from '@/states/filter/use-filter';
import useTasks from '@/states/tasks/use-tasks';
import useTodolist from '@/states/todolist/use-todolist';

const ListTask: FC = () => {
  const auth = useStateAuth();
  const {myTasks} = useTasks();
  const {write: isWrite, owner} = useTodolist();
  const {statusFilterInMytask, setStatusFilterInMyTask} = useFilter();

  const filterMyTasks = () => {
    if (myTasks && myTasks.length > 0) {
      return myTasks.map((todolist, index) => {
        return {
          ...todolist,
          tasks:
            statusFilterInMytask.length != 0
              ? todolist?.tasks.filter(e => !statusFilterInMytask[index] || e.statusId == statusFilterInMytask[index])
              : todolist?.tasks.filter(e => !e.isDone)
        };
      });
    }
  };

  const onAfterFilter = filterMyTasks();

  useEffect(() => {
    setStatusFilterInMyTask([]);
  }, []);

  return (
    <>
      {onAfterFilter?.map(e => e.tasks?.length).reduce((a, b) => a + b, 0) == 0 && (
        <>
          <div className="h-6 lg:h-7"></div>
          <span className="empty">Empty Tasks</span>
        </>
      )}
      {onAfterFilter &&
        onAfterFilter.length > 0 &&
        onAfterFilter.map(todolist => {
          const write = Boolean(todolist)
            ? todolist.visibility === 'PUBLIC' || Boolean(auth && auth.id === todolist.userId)
            : false;
          return (
            <div key={todolist.id}>
              {todolist.tasks?.length > 0 && (
                <>
                  <div className="h-6 lg:h-7"></div>
                  <Link href={ROUTES.LIST + `/${todolist.id}`}>
                    <h4 className="w-fit cursor-pointer text-base font-semibold md:text-h4">{todolist.name}</h4>
                  </Link>
                  <div className="h-3 lg:h-4"></div>
                  <div className={`tasks ${(isWrite || owner) && 'read-only'}`}>
                    {todolist?.tasks.map(task => (
                      <TaskItem key={task.id} task={task} todolist={todolist} write={write} />
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
    </>
  );
};

export default ListTask;
