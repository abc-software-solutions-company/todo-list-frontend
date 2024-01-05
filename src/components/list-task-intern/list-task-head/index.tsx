import {FC} from 'react';
import { ISetTaskType } from '../type';
import styles from './style.module.scss';
import cls from 'classnames';


interface IListTaskHead {
    type: ISetTaskType,
    taskNum: number
}

const ListTaskHead: FC<IListTaskHead> = ({ taskNum, type }) => {
  return (
    <div className={cls(styles['list-tasks-head'], styles[`border-${type}`])}>
      <div className="flex items-start gap-1">
        <p className="capitalize text-gray-[#030712] text-xl font-bold leading-6">{type}</p>
        <span className="text-sm font-normal leading-5 text-gray-500">{taskNum}</span>
      </div>
    </div>
  );
};

export default ListTaskHead;
