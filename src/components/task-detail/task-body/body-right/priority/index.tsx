import {SelectChangeEvent} from '@mui/material';
import classNames from 'classnames';
import {FC} from 'react';

import TaskPiority from '@/components/common/task-priority';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import useTask from '@/states/task/use-task';
import {IBaseProps} from '@/types';

import Title from '../../title';

export const Priority: FC<IBaseProps> = ({className}) => {
  const {write, task, update} = useTask();
  console.log('🚀 ~ file: index.tsx ~ line 15 ~ write', write);
  const toast = useToast();
  const onChange = (event: SelectChangeEvent<unknown>) => {
    api.task
      .update({id: task.id, priority: event.target.value as string})
      .then(update)
      .catch(() => toast.show({type: 'danger', title: 'Priority', content: 'An Error occurrd, please try again'}));
  };
  return (
    <div className={classNames('priority', className)}>
      <Title text="Priority" />
      <div className="select">
        <TaskPiority task={task} onChange={onChange} readOnly={!write} hideTitle={false} />
      </div>
    </div>
  );
};

export default Priority;
