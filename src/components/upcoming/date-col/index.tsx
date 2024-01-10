import React, {CSSProperties, FC, useEffect} from 'react';
import TaskItem from '@/components/project-detail/column/task-item';
import {IMember} from '@/data/api/types/todolist.type';
import useTasks from '@/states/tasks/use-tasks';
import Icon from '@/core-ui/icon';
import {ITaskResponse} from '@/data/api/types/task.type';

interface IDateColumnProps {
  className?: string | undefined;
  date: Date;
  taskLists: ITaskResponse[];
}

const DateColumn: FC<IDateColumnProps> = ({className, date, taskLists}) => {
  const {myTasks, getMyTasks} = useTasks();

  const members: IMember[] = [
    {
      id: 'test',
      name: 'Test Members'
    }
  ];

  useEffect(() => {
    getMyTasks();
  }, []);

  return (
    <div className={`${className} `}>
      <div className="inline-flex h-96 w-96 flex-col items-center justify-between border-r border-gray-300 px-6">
        <div className="flex h-96 flex-col items-center justify-start gap-8 self-stretch">
          <div className="flex h-20 flex-col items-center justify-start gap-4 self-stretch">
            <div className="flex h-20 flex-col items-center justify-center gap-2 self-stretch border-b-2 border-gray-500 px-3 py-4 opacity-40">
              <div className=" text-lg font-semibold leading-normal text-gray-500">
                {date.toLocaleDateString('en-US', {weekday: 'short'})}
              </div>
              <div className="text-gray-950  text-lg font-semibold leading-normal">{date.getDate()}</div>
            </div>
          </div>
        </div>
        {taskLists.map(task => (
          <TaskItem
            title={task.name}
            description="
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam dolore amet corporis officiis quibusdam odit aperiam voluptates, et distinctio labore, quae sit. Totam hic quia laboriosam animi, facilis non quam?
            "
            assignees={task.assignees}
            members={members}
          />
        ))}
        <div className="inline-flex w-40 items-center justify-center gap-2 rounded-lg px-3 py-4">
          <div className="relative h-6 w-6">
            <Icon name="plus" className="ico-plus text-blue-700"></Icon>
          </div>
          <div className=" text-lg font-semibold leading-normal text-gray-700">Add task</div>
        </div>
      </div>
    </div>
  );
};

export default DateColumn;
