import {FC} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';

interface IProps {
  task: ITaskResponse;
}
const TaskDetail: FC<IProps> = ({task}) => {
  return (
    <div className="pt-[10%] text-center">
      <h1 className="">{task.name}</h1>
      <h2>{task.description || 'No description'}</h2>
    </div>
  );
};
export default TaskDetail;
