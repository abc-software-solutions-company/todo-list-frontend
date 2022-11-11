import {FC, useState} from 'react';
import {useForm} from 'react-hook-form';

import Icon from '@/core-ui/icon';
import api from '@/data/api';
import {IBaseProps} from '@/types';

import useTask from '../../hooks/use-task';

interface IFormInputs {
  name: string;
}

const Left: FC<IBaseProps> = ({className}) => {
  const {task, write, update} = useTask();
  const {id, name} = task;
  const {handleSubmit, register} = useForm<IFormInputs>({mode: 'onChange', defaultValues: {name}});
  const [isEditing, setIsEditing] = useState(false);

  const onClick = () => {
    if (write) setIsEditing(true);
  };

  const onClose = () => {
    if (write) setIsEditing(false);
  };

  const onSubmit = handleSubmit(formData => {
    api.task.update({id, name: formData.name}).then(update);
    onClose();
  });

  return (
    <div className={className}>
      {isEditing ? (
        <form className="name-form" onSubmit={onSubmit}>
          <input className="name-input" {...register('name', {value: name})} />
          <button className="h-5" type="submit">
            <Icon name="ico-check-circle" size={20} className="font-black text-green-600" />
          </button>
          <button className="h-6" type="button" onClick={onClose}>
            <Icon name="ico-x" size={24} className="font-black text-red-600" />
          </button>
        </form>
      ) : (
        <h2 className="text-h2" onClick={onClick}>
          {name}
        </h2>
      )}
    </div>
  );
};

export default Left;
