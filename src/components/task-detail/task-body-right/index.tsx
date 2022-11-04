import {SelectChangeEvent} from '@mui/material';

import Status from '@/components/list-detail/status';
import {ITaskResponse} from '@/data/api/types/task.type';

import style from './style.module.scss';

interface IBodyRightProp {
  onChange: (event: SelectChangeEvent<unknown>) => void;
  taskData: ITaskResponse;
}

export const TaskBodyRight = ({onChange, taskData}: IBodyRightProp) => {
  return (
    <>
      <div className={style['task-body-right']}>
        <div className="status">
          <p>Status</p>
          <Status className={style.status} status={taskData.status} items={taskData.todolist.status} onChange={onChange} />
          <hr />
        </div>
        <div className="assigne">
          <p>Thien</p>
          <hr />
        </div>
        <div className="piority">
          <p>Medium</p>
        </div>
        <div className="story-point">
          <p>8</p>
          <hr />
        </div>
        <div className="date">
          <div className="date-start">
            <p>3/11/2022</p>
          </div>
          <div className="date-due">
            <p>4/11/2022</p>
          </div>
          <hr />
          <div className="date-create">
            <p>Created November 1, 2022, 9:33 AM</p>
          </div>
          <div className="date-update">
            <p>Updated November 2, 2022, 1:33 PM</p>
          </div>
        </div>
      </div>
    </>
  );
};
