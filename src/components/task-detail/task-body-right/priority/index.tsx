import {FC} from 'react';

import PrioritySelect from '@/components/task-detail/task-body-right/priority/priority-select';
import {ITaskResponse} from '@/data/api/types/task.type';

import style from './style.module.scss';

interface IPriorityProps {
  taskData: ITaskResponse;
  onSuccess?: () => void;
}
export const Priority: FC<IPriorityProps> = props => {
  return (
    <div className={style.priority}>
      <p className="title">Priority</p>
      <PrioritySelect {...props} />
    </div>
  );
};
export default Priority;
