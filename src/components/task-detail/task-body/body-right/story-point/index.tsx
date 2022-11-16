import classNames from 'classnames';
import {FC} from 'react';

import InputAutosize from '@/components/common/input-autosize';
import api from '@/data/api';
import useTask from '@/states/task/use-task';
import {IBaseProps} from '@/types';

import Title from '../../title';

export const StoryPoint: FC<IBaseProps> = ({className}) => {
  const {task, write, update} = useTask();
  const {id, storyPoint} = task;

  const handleSave = (text: string) => {
    api.task.update({id, storyPoint: text}).then(update);
  };

  return (
    <div className={classNames('point', className)}>
      <Title text="Story Point" />
      <InputAutosize {...{value: storyPoint, handleSave, write}} placeholder="Add point..." />
    </div>
  );
};
export default StoryPoint;
