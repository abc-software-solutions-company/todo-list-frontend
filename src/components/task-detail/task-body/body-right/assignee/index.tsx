import classNames from 'classnames';
import {FC, useState} from 'react';

import AssigneeIcon from '@/components/common/assignee-icon';
import InputAutosize from '@/components/common/input-autosize';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {socketUpdateList} from '@/data/socket';
import useTask from '@/states/task/use-task';
import {IBaseProps} from '@/types';

import Title from '../../title';

const Assignee: FC<IBaseProps> = ({className}) => {
  const {task, update} = useTask();
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const {id, assignee} = task;
  const onClick = () => setIsEditing(true);
  const onClose = () => setIsEditing(false);

  const handleSave = (text: string) => {
    api.task
      .update({id, assignee: {email: text}})
      .then(update)
      .then(socketUpdateList)
      .catch(() => toast.show({type: 'danger', title: 'Assignee', content: 'User Not Existed'}));
    onClose();
  };

  return (
    <div className={classNames('assignee', className)}>
      <Title text="Assignee" />
      {assignee && !isEditing ? (
        <AssigneeIcon data={assignee} onClick={onClick} />
      ) : (
        <InputAutosize autoFocus={true} handleSave={handleSave} onBlur={onClose} />
      )}
    </div>
  );
};
export default Assignee;
