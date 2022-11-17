import {SelectChangeEvent} from '@mui/material';
import classNames from 'classnames';
import {FC} from 'react';

import StatusSelect from '@/components/common/statusSelect';
import api from '@/data/api';
import {socketUpdateList} from '@/data/socket';
import {IBaseProps} from '@/types';

import useTask from '../../../../states/task/use-task';
import Title from '../title';
import style from './style.module.scss';

interface StatusProps extends IBaseProps {
  noTitle?: boolean;
}

const Status: FC<StatusProps> = ({className, noTitle}) => {
  const {task, write, update} = useTask();
  const {id, statusId, todolist} = task;
  const onChange = (event: SelectChangeEvent<number>) => {
    api.task
      .update({id, statusId: Number(event.target.value)})
      .then(update)
      .then(socketUpdateList)
      .catch(() => {});
  };

  return (
    <div className={classNames('status', className)}>
      {!noTitle && <Title text="Status" />}
      <StatusSelect className={style.status} id={statusId} list={todolist.status} onChange={onChange} readonly={!write} />
    </div>
  );
};

export default Status;
