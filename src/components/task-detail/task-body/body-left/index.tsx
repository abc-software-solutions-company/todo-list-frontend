import {FC} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';

import Status from '../status';
import Attachments from './attachment';
import Comment from './comment';
import Description from './description';
import style from './style.module.scss';

export interface IBodyLeftProps {
  className?: string;
  taskData: ITaskResponse;
  onSuccess?: () => void;
}

export interface IItemProp {
  userName: string;
  date: string;
}

const BodyLeft: FC<IBodyLeftProps> = props => {
  return (
    <div className={style['body-left']}>
      <Status {...props} className="divide item" noTitle={true} />
      <Description {...props} className="divide item" />
      <Attachments {...props} className="divide item" />
      <Comment {...props} className="divide item" />
    </div>
  );
};

export default BodyLeft;
