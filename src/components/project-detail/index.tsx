import React, {FC, useEffect, useState} from 'react';

import ErrorInformation from '@/components/common/404';
import socket from '@/data/socket';
import {useStateAuth} from '@/states/auth';
import useTodolist from '@/states/todolist/use-todolist';

import {ITaskResponse} from '@/data/api/types/task.type';
import CompleteColumn from './complete';
import DoingColumn from './doing';
import TodayColumn from './today';

import {isSameDate} from '@/utils/same-date';

interface IProjectDetail {
  id: string;
}

const ProjectDetail: FC<IProjectDetail> = ({id}) => {
  const auth = useStateAuth();
  const {todolist, getTodolist, error} = useTodolist();

  const today: Date = new Date();

  const [todayTasks, setTodayTasks] = useState<ITaskResponse[]>([]);
  const [doingTasks, setDoingTasks] = useState<ITaskResponse[]>([]);
  const [completeTasks, setCompleteTasks] = useState<ITaskResponse[]>([]);

  useEffect(() => {
    if (auth) {
      socket.auth = {...auth, listID: id};
      socket.connect();
      getTodolist(id);
    }
  }, [auth]);

  useEffect(() => {
    if (todolist.tasks) {
      const todayTaskTemp: ITaskResponse[] = [];
      const doingTaskTemp: ITaskResponse[] = [];
      const completeTaskTemp: ITaskResponse[] = [];

      for (const task of todolist.tasks) {
        if (isSameDate(today, task.createdDate)) {
          todayTaskTemp.push(task);
        }

        if (task.isDone === false) {
          doingTaskTemp.push(task);
        } else {
          completeTaskTemp.push(task);
        }
      }

      setTodayTasks([...todayTaskTemp]);
      setDoingTasks([...doingTaskTemp]);
      setCompleteTasks([...completeTaskTemp]);
    }
  }, [todolist]);

  if (error) return <ErrorInformation />;
  return (
    <>
      <div className={`relative flex items-start justify-start gap-6 py-12 px-6 ${'bg-slate-50'}`}>
        <TodayColumn
          addTask={() => {
            console.log('today');
          }}
          members={todolist.members}
          symbol="2000"
          todayTasks={todayTasks}
        />
        <DoingColumn
          symbol="2"
          members={todolist.members}
          doingTasks={doingTasks}
          addTask={() => {
            console.log('doing');
          }}
        />
        <CompleteColumn
          symbol={'2'}
          addTask={() => {
            console.log('complete');
          }}
          members={todolist.members}
          completeTasks={completeTasks}
        />
      </div>
    </>
  );
};

export default ProjectDetail;
