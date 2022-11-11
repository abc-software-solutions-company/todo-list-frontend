import classNames from 'classnames';
import {FC, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';

import useTask from '@/components/task-detail/hooks/use-task';
import Icon from '@/core-ui/icon';
import Input from '@/core-ui/input';
import api from '@/data/api';
import {IBaseProps} from '@/types';

import Title from '../../title';

interface IFormInputs {
  point: string;
}
export const Point: FC<IBaseProps> = ({className}) => {
  const {task, write, update} = useTask();
  const {id, storyPoint} = task;
  const {handleSubmit, register, setValue, setFocus} = useForm<IFormInputs>({mode: 'onChange', defaultValues: {point: storyPoint}});
  const [isEditing, setIsEditing] = useState(false);

  const onClick = () => {
    setFocus('point', {shouldSelect: true});
  };

  const onChange = () => {
    if (write) setIsEditing(true);
  };

  const onClose = () => {
    if (write) setIsEditing(false);
  };

  const onSubmit = handleSubmit(({point}) => {
    setValue('point', point);
    api.task.update({id, storyPoint: point}).then(update);
    onClose();
  });

  useEffect(() => {
    setValue('point', storyPoint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task]);

  return (
    <div className={classNames('point', className)}>
      <Title text="Story Point" />
      <form onSubmit={onSubmit} className="form">
        <Input className="point-input" placeholder="Enter point..." {...register('point')} onChange={onChange} onClick={onClick} />
        {isEditing && (
          <>
            <button className="h-5" type="submit">
              <Icon name="ico-check-circle" size={20} className="font-black text-green-600" />
            </button>
            <button className="h-6" type="button" onClick={onClose}>
              <Icon name="ico-x" size={24} className="font-black text-red-600" />
            </button>
          </>
        )}
      </form>
    </div>
  );
};
export default Point;
