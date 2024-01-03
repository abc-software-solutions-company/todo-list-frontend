import React, {FC} from 'react';

import {ITaskResponse} from '../../../../data/api/types/task.type';
import {IMember} from '../../../../data/api/types/todolist.type';
import Column from '../column';
import TaskItem from '../column/task-item';

interface ITodayColumnProps {
  className?: string | undefined;
  todayTasks: ITaskResponse[];
  addTask: () => void;
  title: string;
  symbol: string;
  members: IMember[];
}

const TodayColumn: FC<ITodayColumnProps> = ({className, title, symbol, todayTasks, members, addTask}) => {
  return (
    <Column
      addTask={addTask}
      className={className}
      title={`${title} - Today`}
      symbol={symbol}
      borderBotColor={'border-blue-400'}
    >
      {!todayTasks.length ? (
        <div className="w-96 bg-gray-50 py-6 px-5">No Task!</div>
      ) : (
        todayTasks.map((task, index) => (
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

export default TodayColumn;
