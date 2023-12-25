import {FC} from 'react';
import { ISetTaskType } from '../type';


interface IListTaskHead {
    type: ISetTaskType,
    taskNum: number
}

const ListTaskHead: FC<IListTaskHead> = ({ taskNum, type }) => {
  
  return (
    <div className="flex items-start gap-1 self-stretch border-b-[3px] border-blue-400 py-3">
      <div className="flex items-start gap-1">
        <p className="capitalize text-gray-[#030712] text-xl font-bold leading-6">{type}</p>
        <span className="text-sm font-normal leading-5 text-gray-500">{taskNum}</span>
      </div>
    </div>
  );
};

export default ListTaskHead;
