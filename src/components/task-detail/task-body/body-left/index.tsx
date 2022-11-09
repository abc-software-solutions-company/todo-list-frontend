import classNames from 'classnames';
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

const BodyLeft: FC<IBodyLeftProps> = ({className, ...rest}) => {
  return (
    <div className={className}>
      <div className={classNames(style['body-left'], 'body-left')}>
        <Status {...rest} className="divide item" noTitle={true} />
        <Description {...rest} className="divide item" />
        <Attachments {...rest} className="divide item" />
        <Comment {...rest} className="divide item" />
      </div>
    </div>
  );
};

export default BodyLeft;
