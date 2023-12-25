import {FC} from 'react';
import styles from './style.module.scss';
import Icon from '@/core-ui/icon';
import Image from 'next/image';
import {ITaskResponse} from '@/data/api/types/task.type';
import cls from 'classnames';

interface ITaskIntern {
  task: ITaskResponse;
}

const TaskIntern: FC<ITaskIntern> = ({task}) => {
  return (
    <div className={styles['task']}>
      <div className="flex items-start gap-[10px] p-1">
        <Icon name="ico-circle" />
      </div>
      <div className="flex flex-col items-start gap-3">
        <Image src={''} width={300} height={145} className="w-full rounded-lg bg-black" alt="task image" />
        <div className="flex items-center gap-[5px]">
          <p className="overflow-hidden text-ellipsis text-xl font-bold leading-6 text-[#030712]">{task.name}</p>
          <div className={cls('flex items-center justify-center gap-[10px] rounded-lg py-1 px-3',`bg-red-600`)}>
            <span className="font-semibold leading-5 text-[#FAFAFA]">tag</span>
          </div>
        </div>
        <div className="flex flex-col items-start gap-1">
          <p className={'task-content'}>
            Lorem ipsum dolor sit amet consectet. Sed diam sociis odio neque amet sed gravida amet consecte tre
          </p>
          <div className="flex items-center justify-center gap-2 rounded-lg p-1 pl-0">
            <p className="leading-5">17h30</p>
            <Icon name="ico-calendar" />
          </div>
        </div>
        <div className="flex items-end justify-between self-stretch">
          <div className="flex items-center justify-center gap-3">
            <Image width={32} height={32} className="-mx-3 rounded-full" src={''} alt="user" />
            <Image width={32} height={32} className="-mx-3 rounded-full" src={''} alt="user" />
            <Image width={32} height={32} className="-mx-3 rounded-full" src={''} alt="user" />
            <div className="-mx-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
              <p className="text-gray-700">+4</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 rounded-lg p-1 pl-0">
            <p>Comment</p>
            <Icon name="ico-messages" />
          </div>
        </div>
      </div>
      <div className="flex items-start gap-[10px] p-1">
        <Icon name="ico-more-horizontal" />
      </div>
    </div>
  );
};

export default TaskIntern;
