import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {FC, useEffect} from 'react';

import TaskItem from '@/components/common/task-item';
import {ROUTES} from '@/configs/routes.config';
import {useStateAuth} from '@/states/auth';
import useFilter from '@/states/filter/use-filter';
import useTasks from '@/states/tasks/use-tasks';
import useTodolist from '@/states/todolist/use-todolist';
import {Priorities} from '@/utils/constant';

const ListTask: FC = () => {
  const auth = useStateAuth();
  const router = useRouter();
  const {myTasks} = useTasks();
  const {write: isWrite, owner} = useTodolist();
  const {statusFilterInMytask, setStatusFilterInMyTask, priorityFilterInList, featureFilterInList} = useFilter();

  const handleOnClick = (taskId: string) => {
    router.push(`${ROUTES.TASK}/${taskId}`);
  };

  const filterMyTasks = () => {
    const PrioritiesList = Object.values(Priorities).reverse();
    const PrioritieValue = PrioritiesList.includes(priorityFilterInList) ? priorityFilterInList : '';
    if (myTasks && myTasks.length > 0) {
      return myTasks.map((todolist, index) => {
        const doneStatus = todolist?.status.find(x => x.name === 'Done')?.id;

        return {
          ...todolist,
          tasks:
            PrioritieValue && statusFilterInMytask.length != 0 && featureFilterInList != 'undefined'
              ? todolist?.tasks.filter(
                  e =>
                    e.priority == PrioritieValue &&
                    e.statusId == statusFilterInMytask[index] &&
                    e.isFeature == featureFilterInList
                )
              : PrioritieValue && statusFilterInMytask.length != 0
              ? todolist?.tasks.filter(e => e.priority == PrioritieValue && e.statusId == statusFilterInMytask[index])
              : PrioritieValue
              ? todolist?.tasks.filter(e => e.priority == PrioritieValue)
              : statusFilterInMytask.length != 0
              ? todolist?.tasks.filter(e => e.statusId == statusFilterInMytask[index])
              : todolist?.tasks.filter(e => e.statusId != doneStatus)
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
        onAfterFilter.map((todolist, index) => {
          const write = Boolean(todolist)
            ? todolist.visibility === 'PUBLIC' || Boolean(auth && auth.id === todolist.userId)
            : false;
          return (
            <div key={`${todolist.id}-${index}`}>
              {todolist.tasks?.length > 0 && (
                <>
                  {index != 0 && <div className="h-6 lg:h-7"></div>}
                  <Link href={ROUTES.LIST + `/${todolist.id}`}>
                    <h4 className="w-fit cursor-pointer text-base font-semibold md:text-h4">{todolist.name}</h4>
                  </Link>
                  <div className="h-3 lg:h-4"></div>
                  <div className={`tasks ${(isWrite || owner) && 'read-only'}`}>
                    {todolist?.tasks.map(task => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        todolist={todolist}
                        write={write}
                        onClick={() => handleOnClick(task.id)}
                      />
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
