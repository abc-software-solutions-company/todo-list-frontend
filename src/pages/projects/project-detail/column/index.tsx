import classNames from 'classnames';
import React, {FC} from 'react';

import AddTaskButton from './add-task/button';

export interface IColumn {
  title: string;
  symbol: string;
  borderBotColor: string;
  children: React.ReactNode;
  className?: string | undefined;
  addTask: () => void;
}

const Column: FC<IColumn> = ({title, symbol, borderBotColor, children, addTask}) => {
  return (
    <div className="flex flex-col items-start justify-start gap-3 rounded-xl bg-gray-50 py-6 px-5 shadow">
      <div
        className={`flex items-start justify-start gap-1 self-stretch border-b-2 py-3 ${classNames} ${borderBotColor}`}
      >
        <div className="flex items-start justify-start gap-1">
          <div className="text-gray-950 text-xl font-bold leading-normal">{title}</div>
          <div className="mt-1 text-sm font-normal leading-5 text-gray-500">{symbol}</div>
        </div>
      </div>
      {children}
      <AddTaskButton onClick={addTask} />
    </div>
  );
};

export default Column;
