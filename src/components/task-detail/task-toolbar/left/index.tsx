import {FC} from 'react';

import InputAutosize from '@/components/common/input-autosize';
import api from '@/data/api';
import useTask from '@/states/task/use-task';
import {IBaseProps} from '@/types';

const Left: FC<IBaseProps> = ({className}) => {
  const {task, write, update} = useTask();

  const handleSave = (text: string) => {
    api.task.update({id: task.id, name: text}).then(update);
  };

  return (
    <div className={className}>
      <InputAutosize {...{handleSave, value: task.name, write}} />
    </div>
  );
};

export default Left;
