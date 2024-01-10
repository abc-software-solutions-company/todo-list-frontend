import React, {CSSProperties, FC, useEffect, useState} from 'react';
import TodayTop from '@/components/home/today/today-top';
import TaskItemLine from '@/components/home/today/task-item-new';
import useTodolist from '@/states/todolist/use-todolist';
import ErrorInformation from '@/components/common/404';
import {isSameDate} from '@/utils/same-date';
import {ITaskResponse} from '@/data/api/types/task.type';
import TodayColumn from '@/components/project-detail/today';
import DoingColumn from '@/components/project-detail/doing';
import CompleteColumn from '@/components/project-detail/complete';

interface ITodayProps {
  className?: string | undefined;
}

const Today: FC<ITodayProps> = ({className}) => {
  const {todolist, getTodolist, error} = useTodolist();
  const [todayTasks, setTodayTasks] = useState<ITaskResponse[]>();
  const [doingTasks, setDoingTasks] = useState<ITaskResponse[]>([]);
  const [completeTasks, setCompleteTasks] = useState<ITaskResponse[]>([]);

  const [viewMode, setViewMode] = useState<boolean>(true);

  const tempMembers = [
    {
      id: 'test',
      name: 'Test Members'
    }
  ];

  const today: Date = new Date();

  useEffect(() => {
    getTodolist('x536l');
  }, []);

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
  if (viewMode === true) {
    return (
      <div className={`${className} flex w-full flex-col`}>
        <TodayTop
          viewMode={viewMode}
          setViewMode={() => {
            setViewMode(!viewMode);
          }}
        />
        <div className="mt-6 flex flex-col gap-6">
          {todayTasks !== undefined &&
            (!todayTasks.length ? (
              <div className="flex h-32 w-full items-start justify-start gap-6 border-b border-gray-400 p-3">
                No Task!
              </div>
            ) : (
              todayTasks.map(task => (
                <TaskItemLine
                  key={task.id}
                  title={task.name}
                  createDate={'Today'}
                  project={'My Project'}
                  tagColor={'bg-green-500'}
                  tagName="ui"
                  description="Lorem ipsum dolor sit amet consectet. Sed diam sociis odio neque amet sed gravida amet consecte tre"
                />
              ))
            ))}
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="flex w-full flex-col">
          <TodayTop viewMode={viewMode} setViewMode={() => setViewMode(!viewMode)} />
          <div className="flex items-start justify-start gap-6">
            <TodayColumn todayTasks={todayTasks!} addTask={() => {}} symbol="0" members={tempMembers} />
            <DoingColumn doingTasks={doingTasks!} addTask={() => {}} symbol="0" members={tempMembers} />
            <CompleteColumn completeTasks={completeTasks!} addTask={() => {}} symbol="0" members={tempMembers} />
          </div>
        </div>
      </>
    );
  }
};

export default Today;
