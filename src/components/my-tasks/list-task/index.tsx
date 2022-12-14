import Link from 'next/link';
import React, {FC} from 'react';

import TaskItem from '@/components/common/task-item';
import {ROUTES} from '@/configs/routes.config';
import {useStateAuth} from '@/states/auth';
import useTasks from '@/states/tasks/use-tasks';

const ListTask: FC = () => {
  const auth = useStateAuth();
  const {myTasks} = useTasks();

  // const getTasks = () => {
  //   if (statusFilter) return todolist.tasks.filter(e => !statusFilter || e.statusId == statusFilter);
  //   return todolist.tasks?.filter(e => !e.isDone);
  // };

  // const tasks = getTasks();

  return (
    <>
      {myTasks?.filter(x => x !== null).length == 0 && <span className="empty">Empty Tasks</span>}
      {myTasks &&
        myTasks.length > 0 &&
        myTasks
          .filter(x => x !== null)
          .map(todolist => {
            const write = Boolean(todolist)
              ? todolist.visibility === 'PUBLIC' || Boolean(auth && auth.id === todolist.userId)
              : false;
            return (
              <div key={todolist.id}>
                <div className="h-6 lg:h-7"></div>
                <Link href={ROUTES.LIST + `/${todolist.id}`}>
                  <h4 className="w-fit cursor-pointer text-base font-semibold md:text-h4">{todolist.name}</h4>
                </Link>
                <div className="h-3 lg:h-4"></div>{' '}
                <div className="tasks">
                  {todolist?.tasks
                    .filter(task => !task.isDone)
                    .map(task => (
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
