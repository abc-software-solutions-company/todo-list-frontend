import React, {FC} from 'react';

import Icon from '@/core-ui/icon';

interface IAddTaskButtonProps {
  className?: string | undefined;
  onClick?: () => void;
}

const AddTaskButton: FC<IAddTaskButtonProps> = ({className, onClick}) => {
  return (
    <div
      onClick={onClick}
      className={`${className} inline-flex w-40 items-center justify-center gap-2 rounded-lg px-3 py-4`}
    >
      <div className="relative h-6 w-6">
        <Icon name="ico-plus" className="font-bold text-blue-700" size={24} />
      </div>
      <div className="text-lg font-semibold leading-normal text-gray-700">Add task</div>
    </div>
  );
};

export default AddTaskButton;
