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
        <div className="container">
          <div className="status">
            <p className="title">Status</p>
            <Status className={style.status} status={taskData.status} items={taskData.todolist.status} onChange={onChange} />
          </div>
          <div className="assigne">
            <p className="title">Assignee</p>
            <p>Thien</p>
          </div>
          <div className="piority">
            <p className="title">Piority</p>
            <p>Medium</p>
          </div>
          <div className="point">
            <p className="title">Point</p>
            <p>8</p>
          </div>
          <div className="date">
            <div className="date-start">
              <p className="title">Start date</p>
              <p>3/11/2022</p>
            </div>
            <div className="date-due">
              <p className="title">Due date</p>
              <p>4/11/2022</p>
            </div>
            <div className="date-create">
              <p>Created November 1, 2022, 9:33 AM</p>
            </div>
            <div className="date-update">
              <p>Updated November 2, 2022, 1:33 PM</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
