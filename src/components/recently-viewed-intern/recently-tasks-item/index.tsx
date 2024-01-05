import ListEllipse from '@/components/common/icons/list-ellipse';
import Icon from '@/core-ui/icon';
import {ProgressBar} from '@/core-ui/progress-bar';
import Image from 'next/image';
import { FC } from 'react';

const RecentlyTasksItem: FC = () => {
  return (
    <div className="recently-tasks-item">
      <div className="flex w-full justify-between">
        <div className="flex flex-col items-start gap-[21px]">
          <p>Task name</p>
          <span>Due date: March 30, 2023</span>
        </div>
        <Icon name="ico-codepen" size={64} />
      </div>
      <div className="flex items-center justify-between self-stretch">
        <div className="flex items-center justify-center gap-3">
          <Image width={32} height={32} className="images-stack" src={''} alt="user" />
          <Image width={32} height={32} className="images-stack" src={''} alt="user" />
          <Image width={32} height={32} className="images-stack" src={''} alt="user" />
          <div className="-mx-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
            <p className="text-gray-700">+4</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-green-500">
          <ListEllipse fill="#22C55E" />
          <p>Completed</p>
        </div>
      </div>
      <div className="flex flex-col items-start gap-1 self-stretch">
        <ProgressBar progress={100} />
        <div className="flex items-center justify-between self-stretch">
          <p>20/20 Total Tasks</p>
          <p>100%</p>
        </div>
      </div>
    </div>
  );
}

export default RecentlyTasksItem;
