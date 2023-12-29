import React, {FC, useEffect, useState} from 'react';

import ErrorInformation from '@/components/common/404';
import socket from '@/data/socket';
import {useStateAuth} from '@/states/auth';
import useTodolist from '@/states/todolist/use-todolist';

import Column from './column';
import AddTask from './column/add-task';
import TaskItem from './column/task-item';

interface IProjectDetail {
  id: string;
}

const ProjectDetail: FC<IProjectDetail> = ({id}) => {
  const auth = useStateAuth();
  const {todolist, getTodolist, error} = useTodolist();

  const today: Date = new Date();

  const [isAddTaskVisible, setAddTaskVisible] = useState(false);

  useEffect(() => {
    if (auth) {
      socket.auth = {...auth, listID: id};
      socket.connect();
      getTodolist(id);
    }
  }, [auth]);

  if (todolist)
    if (todolist.tasks) {
      const todayTask = todolist.tasks.filter(task => task.startDate == today);
      const doingTask = todolist.tasks.filter(task => task.isDone === false);
      const completeTask = todolist.tasks.filter(task => task.isDone === true);

      return (
        <>
          <div className={`relative flex w-full items-start justify-start gap-6  ${'bg-slate-50'}`}>
            <Column
              addTask={() => {
                setAddTaskVisible(!isAddTaskVisible);
              }}
              title={'Today'}
              symbol={'2000'}
              borderBotColor={'border-blue-400'}
            >
              {todayTask.map((task, index) => (
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
              ))}
            </Column>
            <Column
              addTask={() => {
                setAddTaskVisible(!isAddTaskVisible);
              }}
              title={'Doing'}
              symbol={'2'}
              borderBotColor={'border-yellow-500'}
            >
              {doingTask.map((task, index) => (
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
              ))}
            </Column>
            <Column
              addTask={() => {
                setAddTaskVisible(!isAddTaskVisible);
              }}
              title={'Complete'}
              symbol={'2'}
              borderBotColor={'border-green-500'}
            >
              {completeTask.map((task, index) => (
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
              ))}
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
    }
  if (error) return <ErrorInformation />;

  return null;
};

export default ProjectDetail;
