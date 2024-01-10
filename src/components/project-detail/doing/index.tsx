import React, {FC} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';
import {IMember} from '@/data/api/types/todolist.type';
import Column from '../column';
import TaskItem from '../column/task-item';

interface IDoingColumnProps {
  className?: string | undefined;
  doingTasks: ITaskResponse[];
  addTask: () => void;
  symbol: string;
  members: IMember[];
}

const DoingColumn: FC<IDoingColumnProps> = ({className, doingTasks, symbol, members, addTask}) => {
  return (
    <Column addTask={addTask} title="Doing" className={className} symbol={symbol} borderBotColor={'border-blue-400'}>
      {!doingTasks.length ? (
        <div className="w-96 bg-gray-50 py-6 px-5">No Task!</div>
      ) : (
        doingTasks.map((task, index) => (
          <TaskItem
            key={index}
            // description={task.description}
            description="
                      Lorem ipsum dolor sit amet consectet. Sed diam sociis odio neque amet sed gravida amet consecte tre
                      "
            title={task.name}
            assignees={task.assignees}
            members={members}
          />
        ))
      )}
    </Column>
  );
};

export default DoingColumn;
