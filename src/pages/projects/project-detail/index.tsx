import React, {FC, useEffect, useState} from 'react';

import ErrorInformation from '@/components/common/404';
import socket from '@/data/socket';
import {useStateAuth} from '@/states/auth';
import useTodolist from '@/states/todolist/use-todolist';

import {ITaskResponse} from '../../../data/api/types/task.type';
import Column from './column';
import AddTask from './column/add-task';
import TaskItem from './column/task-item';

interface IProjectDetail {
  id: string;
}

const isSameDate = (date1: Date, dateString: string): boolean => {
  const date2: Date = new Date(dateString);

  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const ProjectDetail: FC<IProjectDetail> = ({id}) => {
  const auth = useStateAuth();
  const {todolist, getTodolist, error} = useTodolist();

  const [todayTask, setTodayTask] = useState<ITaskResponse[]>([]);
  const [doingTask, setDoingTask] = useState<ITaskResponse[]>([]);
  const [completeTask, setCompleteTask] = useState<ITaskResponse[]>([]);

  const [isAddTaskVisible, setAddTaskVisible] = useState(false);

  useEffect(() => {
    if (auth) {
      socket.auth = {...auth, listID: id};
      socket.connect();
      getTodolist(id);
    }
  }, [auth]);

  useEffect(() => {
    if (todolist.tasks) {
      const today: Date = new Date();

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

      setTodayTask([...todayTaskTemp]);
      setDoingTask([...doingTaskTemp]);
      setCompleteTask([...completeTaskTemp]);
    }
  }, [todolist]);

  if (error) return <ErrorInformation />;
  return (
    <>
      <div className={`relative flex items-start justify-start gap-6 ${'bg-slate-50'}`}>
        <Column
          addTask={() => {
            setAddTaskVisible(!isAddTaskVisible);
          }}
          title={'Today'}
          symbol={'2000'}
          borderBotColor={'border-blue-400'}
        >
          {!todayTask.length ? (
            <div className="w-96 bg-gray-50 py-6 px-5">No Task!</div>
          ) : (
            todayTask.map((task, index) => (
              <TaskItem
                key={index}
                // description={task.description}
                description="
                      Lorem ipsum dolor sit amet consectet. Sed diam sociis odio neque amet sed gravida amet consecte tre
                      "
                title={task.name}
                assignees={task.assignees}
                members={todolist.members}
              />
            ))
          )}
        </Column>
        <Column
          addTask={() => {
            setAddTaskVisible(!isAddTaskVisible);
          }}
          title={'Doing'}
          symbol={'2'}
          borderBotColor={'border-yellow-500'}
        >
          {!doingTask.length ? (
            <div className="w-96 bg-gray-50 py-6 px-5">No Task!</div>
          ) : (
            doingTask.map((task, index) => (
              <TaskItem
                key={index}
                // description={task.description}
                description="
                    Lorem ipsum dolor sit amet consectet. Sed diam sociis odio neque amet sed gravida amet consecte tre
                    "
                title={task.name}
                assignees={task.assignees}
                members={todolist.members}
              />
            ))
          )}
        </Column>
        <Column
          addTask={() => {
            setAddTaskVisible(!isAddTaskVisible);
          }}
          title={'Complete'}
          symbol={'2'}
          borderBotColor={'border-green-500'}
        >
          {!completeTask.length! ? (
            <div className="w-96 bg-gray-50 py-6 px-5">No Task!</div>
          ) : (
            completeTask.map((task, index) => (
              <TaskItem
                key={index}
                // description={task.description}
                description="
                    Lorem ipsum dolor sit amet consectet. Sed diam sociis odio neque amet sed gravida amet consecte tre
                    "
                title={task.name}
                assignees={task.assignees}
                members={todolist.members}
              />
            ))
          )}
        </Column>
        <AddTask
          isShow={isAddTaskVisible}
          onClick={() => {
            setAddTaskVisible(!isAddTaskVisible);
          }}
        />
      </div>
    </>
  );
};

export default ProjectDetail;
